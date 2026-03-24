import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const SUPABASE_URL = 'https://vybvmrsepsnqwnxpqxqi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5YnZtcnNlcHNucXdueHBxeHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTAxODMsImV4cCI6MjA3OTk2NjE4M30.hg4uT4-14bZ50xsSVe-Zq_Oc9KHqtKow-xZZNtvnS50';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// State
let reports = [];
let activeId = null;
let saveTimer = null;
let currentUser = localStorage.getItem('dezainaz_user') || '';
let currentView = 'report';
let projects = [];
let activeProjectId = null;
let projectTasks = [];
let projectSaveTimer = null;
let teamMembers = [];
let expandedTaskIdx = null;
let taskFilter = 'all'; // all, todo, in_progress, done
let taskAssigneeFilter = '';
let taskSortBy = 'manual'; // manual, status, assignee
let notifSettings = [];
let notifTriggers = [];
let settingsTab = 'members';
let pages = [];
let activePageId = null;

// ========== Utils ==========
function formatDate(ds) {
  const d = new Date(ds + 'T00:00:00');
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
}
function getWeekday(ds) {
  return ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'][new Date(ds+'T00:00:00').getDay()];
}
function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function autoResize(el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; }

// ========== Team Members ==========
async function loadTeamMembers() {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('name');
  if (error) { console.error('Load members error:', error); return; }
  teamMembers = data;
  if (!currentUser && teamMembers.length > 0) {
    currentUser = teamMembers[0].name;
    localStorage.setItem('dezainaz_user', currentUser);
  }
  renderUserSelect();
}

function renderUserSelect() {
  const sel = document.getElementById('userSelect');
  sel.innerHTML = teamMembers.map(m =>
    `<option value="${m.name}" ${m.name === currentUser ? 'selected' : ''}>${m.name}</option>`
  ).join('');
}

function memberOptions(selected) {
  return `<option value="">未割当</option>` +
    teamMembers.map(m =>
      `<option value="${m.name}" ${m.name === selected ? 'selected' : ''}>${m.name}</option>`
    ).join('');
}

// ========== Settings ==========
function openSettings() { switchView('settings'); }
function closeSettings() { document.getElementById('settingsModal').classList.remove('open'); }

// Notification settings CRUD
async function loadNotifSettings() {
  const { data } = await supabase.from('notification_settings').select('*').order('created_at');
  notifSettings = data || [];
  const { data: trigs } = await supabase.from('notification_triggers').select('*');
  notifTriggers = trigs || [];
}

function renderSettingsPage() {
  const sp = document.getElementById('settingsPage');
  sp.style.display = 'block';

  sp.innerHTML = `
    <div class="settings-page-title">設定</div>
    <div class="settings-tabs">
      <button class="settings-tab${settingsTab==='members'?' active':''}" onclick="switchSettingsTab('members')">メンバー</button>
      <button class="settings-tab${settingsTab==='notifications'?' active':''}" onclick="switchSettingsTab('notifications')">通知連携</button>
    </div>
    <div id="settingsContent"></div>
  `;
  renderSettingsContent();
}

function switchSettingsTab(tab) {
  settingsTab = tab;
  renderSettingsPage();
}

function renderSettingsContent() {
  const el = document.getElementById('settingsContent');
  if (settingsTab === 'members') {
    el.innerHTML = `
      <div class="settings-section">
        <div class="settings-section-title">チームメンバー</div>
        <div class="settings-section-desc">日報のユーザー選択やプロジェクトのタスク担当者として表示されます</div>
        <div id="settingsMemberList"></div>
        <div class="add-member-row" style="margin-top:12px">
          <input class="settings-input" style="margin-bottom:0" id="settingsNewMember" placeholder="新しいメンバー名..." onkeydown="if(event.key==='Enter')addMemberFromSettings()">
          <button class="btn-primary-sm" onclick="addMemberFromSettings()">追加</button>
        </div>
      </div>`;
    renderSettingsMemberList();
  } else {
    el.innerHTML = `
      <div class="settings-section">
        <div class="settings-section-title">通知チャンネル <a href="#" onclick="event.preventDefault();showWebhookHelp()" style="font-size:12px;font-weight:500;color:var(--blue);text-decoration:none;margin-left:8px">設定方法</a></div>
        <div class="settings-section-desc">Slack等のWebhook URLを設定すると、イベント発生時に通知を送信します</div>
        <div id="notifSettingsList"></div>
        <button class="btn-primary-sm" style="margin-top:12px" onclick="addNotifSetting()">+ 新しい通知チャンネルを追加</button>
      </div>
      <div class="settings-section">
        <div class="settings-section-title">通知トリガー</div>
        <div class="settings-section-desc">どのイベントで通知を送るか設定します（チャンネルごと）</div>
        <div id="notifTriggersList"></div>
      </div>`;
    renderNotifSettingsList();
    renderNotifTriggersList();
  }
}

function renderSettingsMemberList() {
  const el = document.getElementById('settingsMemberList');
  el.innerHTML = teamMembers.map(m => `
    <div class="settings-row">
      <label>${m.name}</label>
      <button class="btn-sm danger" onclick="removeMember('${m.id}')">削除</button>
    </div>`).join('');
}

async function addMemberFromSettings() {
  const input = document.getElementById('settingsNewMember');
  const name = input.value.trim();
  if (!name) return;
  const { data, error } = await supabase.from('team_members').insert({ name }).select().single();
  if (error) { alert(error.code === '23505' ? '既に登録されています' : 'エラー: ' + error.message); return; }
  teamMembers.push(data);
  teamMembers.sort((a, b) => a.name.localeCompare(b.name));
  input.value = '';
  renderSettingsMemberList();
  renderUserSelect();
}

function renderNotifSettingsList() {
  const el = document.getElementById('notifSettingsList');
  if (!notifSettings.length) {
    el.innerHTML = '<div style="font-size:13px;color:var(--text-tertiary);padding:8px 0">まだ通知チャンネルがありません</div>';
    return;
  }
  el.innerHTML = notifSettings.map(ns => `
    <div class="settings-card">
      <div class="settings-card-header">
        <div>
          <div class="settings-card-title">${ns.name || '無題'}</div>
          <div style="font-size:11px;color:var(--text-tertiary);margin-top:2px">${ns.type.toUpperCase()}</div>
        </div>
        <div class="settings-card-actions">
          <div class="toggle-switch">
            <input type="checkbox" ${ns.enabled ? 'checked' : ''} onchange="toggleNotifSetting('${ns.id}',this.checked)">
            <span class="toggle-slider"></span>
          </div>
          <button class="btn-sm danger" onclick="deleteNotifSetting('${ns.id}')">削除</button>
        </div>
      </div>
      <input class="settings-input" placeholder="チャンネル名" value="${ns.name}"
        onchange="updateNotifSetting('${ns.id}','name',this.value)">
      <div class="settings-row">
        <label>タイプ</label>
        <select class="settings-select" onchange="updateNotifSetting('${ns.id}','type',this.value)">
          <option value="slack" ${ns.type==='slack'?'selected':''}>Slack</option>
          <option value="discord" ${ns.type==='discord'?'selected':''}>Discord</option>
          <option value="webhook" ${ns.type==='webhook'?'selected':''}>Webhook</option>
        </select>
      </div>
      <input class="settings-input" placeholder="Webhook URL" value="${ns.webhook_url}"
        onchange="updateNotifSetting('${ns.id}','webhook_url',this.value)">
    </div>`).join('');
}

function renderNotifTriggersList() {
  const el = document.getElementById('notifTriggersList');
  if (!notifSettings.length) {
    el.innerHTML = '<div style="font-size:13px;color:var(--text-tertiary);padding:8px 0">先に通知チャンネルを追加してください</div>';
    return;
  }
  const events = [
    { key: 'report_created', label: '日報が作成された時' },
    { key: 'report_submitted', label: '日報が提出された時（稼働終了入力）' },
    { key: 'task_created', label: 'タスクが作成された時' },
    { key: 'task_status_changed', label: 'タスクのステータスが変更された時' },
    { key: 'task_completed', label: 'タスクが完了した時' },
    { key: 'project_status_changed', label: 'プロジェクトのステータスが変更された時' },
  ];
  el.innerHTML = notifSettings.map(ns => `
    <div class="settings-card">
      <div class="settings-card-title" style="margin-bottom:8px">${ns.name || '無題'}</div>
      ${events.map(ev => {
        const existing = notifTriggers.find(t => t.notification_setting_id === ns.id && t.event === ev.key && !t.source_id);
        return `<div class="trigger-item">
          <label>${ev.label}</label>
          <div class="toggle-switch">
            <input type="checkbox" ${existing && existing.enabled ? 'checked' : ''}
              onchange="toggleGlobalTrigger('${ns.id}','${ev.key}',this.checked,'${existing && existing.id ? existing.id : ''}')">
            <span class="toggle-slider"></span>
          </div>
        </div>`;
      }).join('')}
    </div>`).join('');
}

async function addNotifSetting() {
  const { data, error } = await supabase.from('notification_settings')
    .insert({ name: '新しいチャンネル', type: 'slack' }).select().single();
  if (error) { alert('エラー: ' + error.message); return; }
  notifSettings.push(data);
  renderSettingsContent();
}

async function updateNotifSetting(id, field, value) {
  const ns = notifSettings.find(n => n.id === id);
  if (ns) ns[field] = value;
  await supabase.from('notification_settings').update({ [field]: value }).eq('id', id);
  renderNotifSettingsList();
}

async function toggleNotifSetting(id, enabled) {
  const ns = notifSettings.find(n => n.id === id);
  if (ns) ns.enabled = enabled;
  await supabase.from('notification_settings').update({ enabled }).eq('id', id);
}

async function deleteNotifSetting(id) {
  if (!confirm('この通知チャンネルを削除しますか？')) return;
  await supabase.from('notification_settings').delete().eq('id', id);
  notifSettings = notifSettings.filter(n => n.id !== id);
  notifTriggers = notifTriggers.filter(t => t.notification_setting_id !== id);
  renderSettingsContent();
}

async function toggleGlobalTrigger(settingId, event, enabled, existingId) {
  if (existingId && existingId !== '' && existingId !== 'undefined' && existingId !== 'null') {
    const { error } = await supabase.from('notification_triggers').update({ enabled }).eq('id', existingId);
    if (error) { console.error('Toggle trigger error:', error); return; }
    const t = notifTriggers.find(x => x.id === existingId);
    if (t) t.enabled = enabled;
  } else {
    const { data, error } = await supabase.from('notification_triggers')
      .insert({ notification_setting_id: settingId, source_type: 'project', event, enabled })
      .select().single();
    if (error) { console.error('Create trigger error:', error); return; }
    if (data) notifTriggers.push(data);
  }
  renderNotifTriggersList();
}

function showWebhookHelp() {
  document.getElementById('webhookHelpModal').classList.add('open');
}

// Slack/Webhook notification sender
async function sendNotification(event, message) {
  for (const ns of notifSettings) {
    if (!ns.enabled || !ns.webhook_url) continue;
    const triggers = notifTriggers.filter(t =>
      t.notification_setting_id === ns.id && t.enabled && (t.event === event || t.event === 'all')
    );
    if (!triggers.length) continue;
    try {
      const body = ns.type === 'slack'
        ? JSON.stringify({ text: message })
        : ns.type === 'discord'
        ? JSON.stringify({ content: message })
        : JSON.stringify({ event, message });
      await fetch(ns.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      });
    } catch (e) { console.error('Notification error:', e); }
  }
}
function renderMemberListEdit() {
  const el = document.getElementById('memberListEdit');
  el.innerHTML = teamMembers.map(m => `
    <div class="member-edit-item">
      <span class="member-edit-name">${m.name}</span>
      <button class="btn-remove-member" onclick="removeMember('${m.id}')">削除</button>
    </div>
  `).join('');
}
async function addMember() {
  const input = document.getElementById('newMemberInput');
  const name = input.value.trim();
  if (!name) return;
  const { data, error } = await supabase
    .from('team_members')
    .insert({ name })
    .select()
    .single();
  if (error) {
    if (error.code === '23505') alert('この名前は既に登録されています');
    else alert('エラー: ' + error.message);
    return;
  }
  teamMembers.push(data);
  teamMembers.sort((a, b) => a.name.localeCompare(b.name));
  input.value = '';
  renderMemberListEdit();
  renderUserSelect();
}
async function removeMember(id) {
  const member = teamMembers.find(m => m.id === id);
  if (!confirm(`「${member.name}」を削除しますか？`)) return;
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  if (error) { console.error('Remove member error:', error); return; }
  teamMembers = teamMembers.filter(m => m.id !== id);
  renderMemberListEdit();
  renderUserSelect();
}

// ========== Title Dropdown ==========
function toggleTitleDropdown() {
  const btn = document.getElementById('titleDropdownBtn');
  const menu = document.getElementById('titleDropdownMenu');
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
  if (!isOpen) {
    setTimeout(() => {
      document.addEventListener('click', closeTitleDropdownOutside, { once: true });
    }, 0);
  }
}
function closeTitleDropdownOutside(e) {
  const dropdown = document.querySelector('.title-dropdown');
  if (!dropdown.contains(e.target)) {
    document.getElementById('titleDropdownMenu').classList.remove('open');
    document.getElementById('titleDropdownBtn').classList.remove('open');
  }
}

// ========== View Switcher ==========
function switchView(view) {
  currentView = view;
  const labels = { report: '日報', project: 'プロジェクト', pages: 'メモ', settings: '設定' };
  document.getElementById('titleLabel').textContent = labels[view] || view;
  document.getElementById('titleDropdownMenu').classList.remove('open');
  document.getElementById('titleDropdownBtn').classList.remove('open');
  document.getElementById('optReport').classList.toggle('active', view === 'report');
  document.getElementById('optProject').classList.toggle('active', view === 'project');
  document.getElementById('optPages').classList.toggle('active', view === 'pages');
  document.getElementById('reportControls').style.display = view === 'report' ? '' : 'none';
  document.getElementById('projectControls').style.display = view === 'project' ? '' : 'none';
  document.getElementById('pagesControls').style.display = view === 'pages' ? '' : 'none';

  document.getElementById('editor').style.display = 'none';
  document.getElementById('projectEditor').style.display = 'none';
  document.getElementById('pageEditor').style.display = 'none';
  document.getElementById('settingsPage').style.display = 'none';
  document.getElementById('sidebarList').style.display = view === 'settings' ? 'none' : '';

  if (view === 'settings') {
    document.getElementById('emptyState').style.display = 'none';
    loadNotifSettings();
    renderSettingsPage();
  } else {
    document.getElementById('emptyState').style.display = 'flex';
    const emptyTexts = { report: '「新しい日報を作成」で始めましょう', project: '「新しいプロジェクト」で始めましょう', pages: '「新しいメモ」で始めましょう' };
    document.getElementById('emptyText').textContent = emptyTexts[view] || '';
    if (view === 'report') { activeProjectId = null; activePageId = null; loadReports(); }
    else if (view === 'project') { activeId = null; activePageId = null; loadProjects(); }
    else if (view === 'pages') { activeId = null; activeProjectId = null; loadPages(); }
  }
  closeSidebarMobile();
}

// ========== DAILY REPORTS ==========
function mapRow(row) {
  return {
    id: row.id, date: row.date, username: row.username,
    startTime: row.start_time ? row.start_time.slice(0,5) : '',
    endTime: row.end_time ? row.end_time.slice(0,5) : '',
    todos: row.todos || [], dones: row.dones || [],
    notes: row.notes || '', createdAt: row.created_at
  };
}

function switchUser(name) {
  currentUser = name;
  localStorage.setItem('dezainaz_user', name);
  activeId = null;
  document.getElementById('editor').style.display = 'none';
  document.getElementById('emptyState').style.display = 'flex';
  loadReports();
}

function saveToDb() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    const r = getActive();
    if (!r) return;
    await supabase.from('daily_reports').update({
      start_time: r.startTime || null, end_time: r.endTime || null,
      todos: r.todos, dones: r.dones, notes: r.notes
    }).eq('id', r.id);
  }, 400);
}

async function loadReports() {
  const { data, error } = await supabase
    .from('daily_reports').select('*')
    .eq('username', currentUser)
    .order('date', { ascending: false });
  if (error) { console.error('Load error:', error); return; }
  reports = data.map(mapRow);
  renderReportList();
  if (!reports.find(r => r.id === activeId)) {
    activeId = null;
    if (reports.length > 0) selectReport(reports[0].id);
    else { document.getElementById('editor').style.display = 'none'; document.getElementById('emptyState').style.display = 'flex'; }
  }
}

async function createNewReport() {
  const dp = document.getElementById('newReportDate');
  const targetDate = dp.value || todayStr();
  const existing = reports.find(r => r.date === targetDate);
  if (existing) { selectReport(existing.id); closeSidebarMobile(); return; }
  const { data, error } = await supabase
    .from('daily_reports').insert({ date: targetDate, username: currentUser }).select().single();
  if (error) {
    if (error.code === '23505') { await loadReports(); const f = reports.find(r => r.date === targetDate); if (f) selectReport(f.id); }
    else alert('作成エラー: ' + error.message);
    return;
  }
  reports.push(mapRow(data));
  reports.sort((a,b) => b.date.localeCompare(a.date));
  renderReportList(); selectReport(data.id);
  dp.value = ''; closeSidebarMobile();
  sendNotification('report_created', `📝 ${currentUser}が${formatDate(targetDate)}の日報を作成しました`);
}

function selectReport(id) { activeId = id; renderReportList(); renderEditor(); closeSidebarMobile(); }

async function deleteReport(id) {
  if (!confirm('この日報を削除しますか？')) return;
  await supabase.from('daily_reports').delete().eq('id', id);
  reports = reports.filter(r => r.id !== id);
  if (activeId === id) { activeId = null; document.getElementById('editor').style.display = 'none'; document.getElementById('emptyState').style.display = 'flex'; }
  renderReportList();
}

function getActive() { return reports.find(r => r.id === activeId); }

function renderReportList() {
  document.getElementById('sidebarList').innerHTML = reports.map(r => {
    const isActive = r.id === activeId;
    const hasTime = r.startTime && !r.endTime;
    const status = hasTime ? '稼働中' : (r.endTime ? '完了' : '未開始');
    const sc = hasTime ? ' working' : '';
    return `<div class="report-item${isActive?' active':''}" onclick="selectReport('${r.id}')">
      <div class="report-item-date">${formatDate(r.date)}</div>
      <div class="report-item-sub">${getWeekday(r.date)}</div>
      <span class="report-item-status${sc}">${status}</span>
    </div>`;
  }).join('');
}

function renderEditor() {
  const r = getActive(); if (!r) return;
  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('projectEditor').style.display = 'none';
  const ed = document.getElementById('editor'); ed.style.display = 'block';
  ed.innerHTML = `
    <div class="report-date-display">${formatDate(r.date)}</div>
    <div class="report-weekday">${getWeekday(r.date)}</div>
    <div class="time-section">
      <div class="time-block"><div class="time-label">稼働開始</div><div class="time-input-row">
        <input type="time" class="time-input" id="startTime" value="${r.startTime}" onchange="updateTime('startTime',this.value)">
        <button class="btn-now" onclick="setNow('startTime')">現在時刻</button></div></div>
      <div class="time-block"><div class="time-label">稼働終了</div><div class="time-input-row">
        <input type="time" class="time-input" id="endTime" value="${r.endTime}" onchange="updateTime('endTime',this.value)">
        <button class="btn-now" onclick="setNow('endTime')">現在時刻</button></div></div>
    </div>
    <div class="section"><div class="section-header">
      <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span class="section-title">今日やること</span></div>
      <ul class="task-list" id="todoList"></ul>
      <button class="btn-add-task" onclick="addTask('todos')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>タスクを追加</button></div>
    <div class="section"><div class="section-header">
      <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      <span class="section-title">今日やったこと</span>
      <button onclick="aiReflectDones()" style="margin-left:auto;font-family:'Inter',sans-serif;font-size:11px;font-weight:500;color:var(--text-tertiary);background:none;border:none;cursor:pointer;padding:2px 0;transition:color 150ms ease" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-tertiary)'"
        >+ 完了タスクから反映</button></div>
      <ul class="task-list" id="doneList"></ul>
      <button class="btn-add-task" onclick="addTask('dones')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>タスクを追加</button></div>
    <div class="section"><div class="section-header">
      <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      <span class="section-title">メモ</span></div>
      <textarea class="notes-textarea" placeholder="自由にメモを残せます..." oninput="updateNotes(this.value)">${r.notes}</textarea></div>
    <div style="margin-top:32px">
      <button class="btn-submit-report${r.endTime?' submitted':''}" onclick="submitReport()" ${r.endTime?'disabled':''}>
        ${r.endTime?'提出済み ✓':'日報を提出'}
      </button>
    </div>
    <div class="report-footer">
      <button class="btn-delete-report" onclick="deleteReport('${r.id}')">この日報を削除</button>
      <span class="report-meta">作成: ${new Date(r.createdAt).toLocaleString('ja-JP')}</span></div>`;
  renderTasks('todos','todoList'); renderTasks('dones','doneList');
}

function renderTasks(key, listId) {
  const r = getActive(); if (!r) return;
  const list = document.getElementById(listId);
  list.innerHTML = r[key].map((t,i) => `
    <li class="task-item${t.done?' checked':''}">
      <input type="checkbox" class="task-checkbox" ${t.done?'checked':''} onchange="toggleTask('${key}',${i})">
      <textarea class="task-text" rows="1" placeholder="タスクを入力..." oninput="updateTaskText('${key}',${i},this.value);autoResize(this)" onkeydown="taskKeydown(event,'${key}',${i})">${t.text}</textarea>
      <button class="task-delete" onclick="removeTask('${key}',${i})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </li>`).join('');
  list.querySelectorAll('.task-text').forEach(ta => autoResize(ta));
}

function addTask(key) {
  const r = getActive(); if (!r) return;
  r[key].push({text:'',done:false}); saveToDb();
  const lid = key==='todos'?'todoList':'doneList'; renderTasks(key,lid);
  const inputs = document.getElementById(lid).querySelectorAll('.task-text');
  if (inputs.length) inputs[inputs.length-1].focus();
}
function toggleTask(key,idx) {
  const r = getActive(); if (!r) return;
  r[key][idx].done = !r[key][idx].done; saveToDb();
  renderTasks(key, key==='todos'?'todoList':'doneList'); renderReportList();
}
function updateTaskText(key,idx,val) { const r = getActive(); if (!r) return; r[key][idx].text = val; saveToDb(); }
function removeTask(key,idx) {
  const r = getActive(); if (!r) return;
  r[key].splice(idx,1); saveToDb(); renderTasks(key, key==='todos'?'todoList':'doneList');
}
function taskKeydown(e,key,idx) {
  if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); addTask(key); }
  if (e.key==='Backspace' && e.target.value==='') {
    e.preventDefault(); removeTask(key,idx);
    const inputs = document.getElementById(key==='todos'?'todoList':'doneList').querySelectorAll('.task-text');
    if (inputs.length && idx>0) inputs[idx-1].focus();
  }
}
function updateTime(field,val) {
  const r = getActive(); if (!r) return; r[field]=val; saveToDb(); renderReportList();
  if (field === 'endTime' && val) sendNotification('report_submitted', `✅ ${currentUser}が${formatDate(r.date)}の日報を提出しました（稼働終了: ${val}）`);
}
function setNow(field) { const t = nowTime(); document.getElementById(field).value=t; updateTime(field,t); }
function updateNotes(val) { const r = getActive(); if (!r) return; r.notes=val; saveToDb(); }

function submitReport() {
  const r = getActive(); if (!r) return;
  if (!r.startTime) { alert('稼働開始時刻を入力してください'); return; }
  const endTime = r.endTime || nowTime();
  r.endTime = endTime;
  document.getElementById('endTime').value = endTime;
  saveToDb();
  renderReportList();
  renderEditor();
  sendNotification('report_submitted', `✅ ${currentUser}が${formatDate(r.date)}の日報を提出しました（${r.startTime}〜${endTime}）`);
}





// AI反映 — 今日完了したタスクを「今日やったこと」に自動追加
async function aiReflectDones() {
  const r = getActive(); if (!r) return;
  const todayStart = r.date + 'T00:00:00';
  const todayEnd = r.date + 'T23:59:59';
  const { data } = await supabase.from('project_tasks')
    .select('title, projects(name)')
    .eq('completed_by', currentUser)
    .gte('completed_at', todayStart)
    .lte('completed_at', todayEnd);
  if (!data || !data.length) {
    alert('今日完了したタスクが見つかりません');
    return;
  }
  const existing = r.dones.map(d => d.text);
  let added = 0;
  for (const t of data) {
    const text = t.projects ? `[${t.projects.name}] ${t.title}` : t.title;
    if (!existing.includes(text)) {
      r.dones.push({ text, done: true });
      added++;
    }
  }
  if (added === 0) { alert('すべて既に反映済みです'); return; }
  saveToDb();
  renderTasks('dones', 'doneList');
  renderReportList();
}

// ========== PROJECTS ==========
async function loadProjects() {
  // Get projects where current user is a member
  const { data: memberships } = await supabase.from('project_members')
    .select('project_id').eq('username', currentUser);
  const myProjectIds = memberships ? memberships.map(m => m.project_id) : [];

  const { data } = await supabase.from('projects').select('*').order('created_at',{ascending:false});
  // Filter to only my projects
  projects = (data || []).filter(p => myProjectIds.includes(p.id));
  for (const p of projects) {
    const { data: tasks } = await supabase.from('project_tasks').select('status').eq('project_id',p.id);
    p._taskCount = tasks?tasks.length:0;
    p._doneCount = tasks?tasks.filter(t=>t.status==='done').length:0;
    p._isMember = true;
    p._membersLoaded = true;
  }
  renderProjectList();
  if (!projects.find(p=>p.id===activeProjectId)) {
    activeProjectId = null;
    if (projects.length>0) selectProject(projects[0].id);
  }
}

async function createNewProject() {
  const { data, error } = await supabase.from('projects')
    .insert({name:'新しいプロジェクト',created_by:currentUser}).select().single();
  if (error) { alert('作成エラー: '+error.message); return; }
  // Auto-add creator as owner
  await supabase.from('project_members').insert({ project_id: data.id, username: currentUser, role: 'owner' });
  data._taskCount=0; data._doneCount=0; data._isMember=true; data._membersLoaded=true;
  projects.unshift(data); renderProjectList(); selectProject(data.id); closeSidebarMobile();
  setTimeout(()=>{ const ni=document.querySelector('.project-name-input'); if(ni){ni.select();ni.focus();} },100);
}

function selectProject(id) { activeProjectId=id; renderProjectList(); loadProjectTasks(id); closeSidebarMobile(); }

async function deleteProject(id) {
  if (!confirm('このプロジェクトを削除しますか？タスクもすべて削除されます。')) return;
  await supabase.from('projects').delete().eq('id',id);
  projects = projects.filter(p=>p.id!==id);
  if (activeProjectId===id) { activeProjectId=null; document.getElementById('projectEditor').style.display='none'; document.getElementById('emptyState').style.display='flex'; }
  renderProjectList();
}

function getActiveProject() { return projects.find(p=>p.id===activeProjectId); }

function renderProjectList() {
  const sl = { active:'進行中', on_hold:'保留', completed:'完了', cancelled:'中止' };
  document.getElementById('sidebarList').innerHTML = projects.map(p => {
    const isActive = p.id===activeProjectId;
    const pct = p._taskCount>0?Math.round((p._doneCount/p._taskCount)*100):0;
    return `<div class="project-item${isActive?' active':''}" onclick="selectProject('${p.id}')">
      <div class="project-item-name">${p.name}</div>
      <div class="project-item-meta">
        <span class="status-badge ${p.status}">${sl[p.status]}</span>
        <div class="progress-bar-mini"><div class="progress-bar-mini-fill" style="width:${pct}%"></div></div>
        <span>${p._taskCount>0?p._doneCount+'/'+p._taskCount:'タスクなし'}</span>
      </div></div>`;
  }).join('');
}

function saveProjectToDb() {
  if (projectSaveTimer) clearTimeout(projectSaveTimer);
  projectSaveTimer = setTimeout(async()=>{
    const p = getActiveProject(); if (!p) return;
    await supabase.from('projects').update({
      name:p.name, description:p.description, status:p.status,
      priority:p.priority, start_date:p.start_date||null,
      due_date:p.due_date||null, updated_at:new Date().toISOString()
    }).eq('id',p.id);
    renderProjectList();
  },400);
}

async function loadProjectTasks(projectId) {
  const { data } = await supabase.from('project_tasks').select('*')
    .eq('project_id',projectId).order('sort_order').order('created_at');
  projectTasks = data || [];
  renderProjectEditor();
}

function renderProjectEditor() {
  const p = getActiveProject(); if (!p) return;
  document.getElementById('emptyState').style.display='none';
  document.getElementById('editor').style.display='none';
  const pe = document.getElementById('projectEditor'); pe.style.display='block';

  const total=projectTasks.length;
  const done=projectTasks.filter(t=>t.status==='done').length;
  const inProg=projectTasks.filter(t=>t.status==='in_progress').length;
  const pct=total>0?Math.round((done/total)*100):0;

  const statusLabels={todo:'未着手',in_progress:'進行中',done:'完了'};

  pe.innerHTML = `
    <input class="project-name-input" value="${p.name}" placeholder="プロジェクト名..." oninput="updateProjectField('name',this.value)">
    <textarea class="project-desc-input" rows="1" placeholder="説明を追加..." oninput="updateProjectField('description',this.value);autoResize(this)">${p.description||''}</textarea>
    <div class="project-meta-row">
      <div class="meta-field"><div class="meta-field-label">ステータス</div>
        <select onchange="updateProjectField('status',this.value)">
          <option value="active" ${p.status==='active'?'selected':''}>進行中</option>
          <option value="on_hold" ${p.status==='on_hold'?'selected':''}>保留</option>
          <option value="completed" ${p.status==='completed'?'selected':''}>完了</option>
          <option value="cancelled" ${p.status==='cancelled'?'selected':''}>中止</option></select></div>
      <div class="meta-field"><div class="meta-field-label">優先度</div>
        <select onchange="updateProjectField('priority',this.value)">
          <option value="low" ${p.priority==='low'?'selected':''}>低</option>
          <option value="medium" ${p.priority==='medium'?'selected':''}>中</option>
          <option value="high" ${p.priority==='high'?'selected':''}>高</option></select></div>
      <div class="meta-field"><div class="meta-field-label">開始日</div>
        <input type="date" value="${p.start_date||''}" onchange="updateProjectField('start_date',this.value)"></div>
      <div class="meta-field"><div class="meta-field-label">期限</div>
        <input type="date" value="${p.due_date||''}" onchange="updateProjectField('due_date',this.value)"></div>
    </div>
    <div class="progress-section"><div class="progress-header">
      <span class="progress-label">進捗 — ${done} 完了 / ${inProg} 進行中 / ${total} タスク</span>
      <span class="progress-percent">${pct}%</span></div>
      <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div></div>
    <div class="section"><div class="section-header">
      <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      <span class="section-title">タスク</span>
      <div class="task-menu-wrap" style="margin-left:auto">
        <button class="task-menu-btn" onclick="toggleTaskMenu(event)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
        <div class="task-menu-dropdown" id="taskMenuDropdown">
          <button class="task-menu-item" onclick="closeTaskMenu();showBulkPanel()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            テキスト一括追加</button>
          <button class="task-menu-item" onclick="closeTaskMenu();document.getElementById('fileInput').click()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            ファイル取込</button>
        </div>
      </div>
      </div>
      <input type="file" id="fileInput" class="file-input-hidden" accept=".txt,.csv,.tsv,.md" onchange="handleFileUpload(event)">
      <div class="task-filters">
        <button class="filter-chip${taskFilter==='all'?' active':''}" onclick="setTaskFilter('all')">すべて</button>
        <button class="filter-chip${taskFilter==='todo'?' active':''}" onclick="setTaskFilter('todo')">未着手</button>
        <button class="filter-chip${taskFilter==='in_progress'?' active':''}" onclick="setTaskFilter('in_progress')">進行中</button>
        <button class="filter-chip${taskFilter==='done'?' active':''}" onclick="setTaskFilter('done')">完了</button>
        <select class="filter-select" onchange="setTaskAssigneeFilter(this.value)">
          <option value="">担当: すべて</option>
          ${teamMembers.map(m=>`<option value="${m.name}"${taskAssigneeFilter===m.name?' selected':''}>${m.name}</option>`).join('')}
        </select>
        <select class="filter-select" onchange="setTaskSort(this.value)">
          <option value="manual"${taskSortBy==='manual'?' selected':''}>並び: 手動</option>
          <option value="status"${taskSortBy==='status'?' selected':''}>並び: ステータス</option>
          <option value="assignee"${taskSortBy==='assignee'?' selected':''}>並び: 担当者</option>
        </select>
      </div>
      <div id="bulkPanel"></div>
      <div id="aiPanel"></div>
      <div id="projectTaskList"></div>
      <button class="btn-add-task" onclick="addProjectTask()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>タスクを追加</button></div>
    <div class="section" style="margin-top:24px"><div class="section-header">
      <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <span class="section-title">メンバー</span></div>
      <div id="projectMemberList"></div>
      <div style="display:flex;gap:8px;margin-top:12px;align-items:center">
        <select class="member-select" id="inviteMemberSelect" style="flex:1">
          <option value="">メンバーを招待...</option>
          ${teamMembers.map(m => `<option value="${m.name}">${m.name}</option>`).join('')}
        </select>
        <button onclick="inviteProjectMember('${p.id}')" style="padding:8px 16px;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;background:var(--accent);color:#fff;border:none;border-radius:var(--radius);cursor:pointer;white-space:nowrap;transition:opacity 150ms ease" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">招待</button>
      </div>
    </div>
    <div class="report-footer">
      <button class="btn-delete-report" onclick="deleteProject('${p.id}')">このプロジェクトを削除</button>
      <span class="report-meta">作成: ${new Date(p.created_at).toLocaleString('ja-JP')}</span></div>`;

  const descTA = pe.querySelector('.project-desc-input');
  if (descTA) autoResize(descTA);
  renderProjectTaskList();
  loadProjectMembers();
}

async function loadProjectMembers() {
  const p = getActiveProject(); if (!p) return;
  const { data } = await supabase.from('project_members').select('*').eq('project_id', p.id);
  const el = document.getElementById('projectMemberList'); if (!el) return;
  if (!data || !data.length) { el.innerHTML = '<div style="font-size:13px;color:var(--text-tertiary);padding:8px 0">メンバーなし</div>'; return; }
  el.innerHTML = data.map(m => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border-light)">
      <div style="width:28px;height:28px;border-radius:50%;background:var(--tag-bg);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--text-secondary);flex-shrink:0">${m.username.charAt(0).toUpperCase()}</div>
      <span style="font-size:13px;font-weight:500;flex:1;color:var(--text-primary)">${m.username}</span>
      <span class="perm-badge ${m.role}">${m.role === 'owner' ? 'オーナー' : 'メンバー'}</span>
      ${m.role !== 'owner' ? `<button onclick="removeProjectMember('${m.id}')" style="border:none;background:none;color:var(--text-tertiary);cursor:pointer;padding:4px;transition:color 150ms" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--text-tertiary)'">&times;</button>` : ''}
    </div>`).join('');
}

async function inviteProjectMember(projectId) {
  const select = document.getElementById('inviteMemberSelect');
  const name = select.value;
  if (!name) return;
  const { error } = await supabase.from('project_members').insert({ project_id: projectId, username: name });
  if (error) { alert(error.code === '23505' ? '既にメンバーです' : 'エラー: ' + error.message); return; }
  select.value = '';
  loadProjectMembers();
}

async function removeProjectMember(id) {
  if (!confirm('このメンバーを削除しますか？')) return;
  await supabase.from('project_members').delete().eq('id', id);
  loadProjectMembers();
}

// Permission check
async function getProjectRole(projectId) {
  const { data } = await supabase.from('project_members')
    .select('role').eq('project_id', projectId).eq('username', currentUser).single();
  return data ? data.role : null;
}

// ========== Pages (メモ) ==========
async function loadPages() {
  const { data } = await supabase.from('pages').select('*').order('updated_at', { ascending: false });
  pages = data || [];
  renderPageList();
  if (!pages.find(p => p.id === activePageId)) {
    activePageId = null;
    if (pages.length > 0) selectPage(pages[0].id);
  }
}

async function createNewPage() {
  const { data, error } = await supabase.from('pages')
    .insert({ title: '', content: '', created_by: currentUser }).select().single();
  if (error) { alert('エラー: ' + error.message); return; }
  pages.unshift(data);
  renderPageList();
  selectPage(data.id);
  closeSidebarMobile();
  setTimeout(() => {
    const ti = document.querySelector('.project-name-input');
    if (ti) ti.focus();
  }, 100);
}

function selectPage(id) {
  activePageId = id;
  renderPageList();
  renderPageEditor();
  closeSidebarMobile();
}

async function deletePage(id) {
  if (!confirm('このメモを削除しますか？')) return;
  await supabase.from('pages').delete().eq('id', id);
  pages = pages.filter(p => p.id !== id);
  if (activePageId === id) {
    activePageId = null;
    document.getElementById('pageEditor').style.display = 'none';
    document.getElementById('emptyState').style.display = 'flex';
  }
  renderPageList();
}

function getActivePage() { return pages.find(p => p.id === activePageId); }

function renderPageList() {
  document.getElementById('sidebarList').innerHTML = pages.map(p => {
    const active = p.id === activePageId;
    const preview = p.title || '無題';
    return `<div class="report-item${active ? ' active' : ''}" onclick="selectPage('${p.id}')">
      <div class="report-item-date">${p.icon || '📄'} ${preview}</div>
      <div class="report-item-sub">${new Date(p.updated_at).toLocaleDateString('ja-JP')}</div>
    </div>`;
  }).join('');
}

let pageSaveTimer = null;
function savePageToDb() {
  if (pageSaveTimer) clearTimeout(pageSaveTimer);
  pageSaveTimer = setTimeout(async () => {
    const p = getActivePage(); if (!p) return;
    await supabase.from('pages').update({
      title: p.title, content: p.content, icon: p.icon,
      project_id: p.project_id || null, updated_at: new Date().toISOString()
    }).eq('id', p.id);
    renderPageList();
  }, 500);
}

function renderPageEditor() {
  const p = getActivePage(); if (!p) return;
  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('editor').style.display = 'none';
  document.getElementById('projectEditor').style.display = 'none';
  const pe = document.getElementById('pageEditor');
  pe.style.display = 'block';

  let projectOpts = '<option value="">プロジェクトに紐付けない</option>';
  projects.forEach(pj => { projectOpts += `<option value="${pj.id}"${p.project_id===pj.id?' selected':''}>${pj.name}</option>`; });

  pe.innerHTML = `
    <button class="page-icon-btn" onclick="cyclePageIcon()">${p.icon || '📄'}</button>
    <input class="project-name-input" value="${p.title || ''}" placeholder="無題"
      oninput="updatePageField('title',this.value)">
    <div class="page-project-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
      <select style="font-size:12px;border:none;outline:none;color:var(--text-tertiary);background:none;cursor:pointer"
        onchange="updatePageField('project_id',this.value||null)">${projectOpts}</select>
    </div>
    <textarea class="page-content-editor" placeholder="ここに自由に書く..."
      oninput="updatePageField('content',this.value);autoResize(this)">${p.content || ''}</textarea>
    <div class="report-footer">
      <button class="btn-delete-report" onclick="deletePage('${p.id}')">このメモを削除</button>
      <span class="report-meta">${p.created_by} · ${new Date(p.created_at).toLocaleString('ja-JP')}</span>
    </div>`;

  const contentTA = pe.querySelector('.page-content-editor');
  if (contentTA) autoResize(contentTA);
}

const PAGE_ICONS = ['📄','📝','📋','📌','💡','🔖','📎','🗂️','📊','🎯','🚀','⭐'];
function cyclePageIcon() {
  const p = getActivePage(); if (!p) return;
  const idx = PAGE_ICONS.indexOf(p.icon || '📄');
  p.icon = PAGE_ICONS[(idx + 1) % PAGE_ICONS.length];
  savePageToDb();
  renderPageEditor();
}

function updatePageField(field, value) {
  const p = getActivePage(); if (!p) return;
  p[field] = value;
  savePageToDb();
}

function getFilteredTaskIndices() {
  const indices = [];
  projectTasks.forEach((t, i) => {
    if (taskFilter !== 'all' && t.status !== taskFilter) return;
    if (taskAssigneeFilter && (t.assignee || '') !== taskAssigneeFilter) return;
    indices.push(i);
  });
  if (taskSortBy === 'status') {
    const order = { in_progress: 0, todo: 1, done: 2 };
    indices.sort((a, b) => (order[projectTasks[a].status] ?? 1) - (order[projectTasks[b].status] ?? 1));
  } else if (taskSortBy === 'assignee') {
    indices.sort((a, b) => (projectTasks[a].assignee || 'zzz').localeCompare(projectTasks[b].assignee || 'zzz'));
  }
  return indices;
}

function setTaskFilter(f) { taskFilter = f; renderProjectEditor(); }
function setTaskAssigneeFilter(v) { taskAssigneeFilter = v; renderProjectEditor(); }
function setTaskSort(v) { taskSortBy = v; renderProjectEditor(); }

function renderProjectTaskList() {
  const list = document.getElementById('projectTaskList'); if (!list) return;
  const sl={todo:'未着手',in_progress:'進行中',done:'完了'};
  const filtered = getFilteredTaskIndices();
  list.innerHTML = filtered.map(i => {
    const t = projectTasks[i];
    const isOpen = expandedTaskIdx === i;
    const hasMemo = t.description && t.description.trim();
    return `
    <div class="p-task-item${t.status==='done'?' done':''}${isOpen?' has-detail':''}"
      draggable="true" data-idx="${i}"
      ondragstart="onTaskDragStart(event,${i})" ondragover="onTaskDragOver(event)" ondragenter="onTaskDragEnter(event)"
      ondragleave="onTaskDragLeave(event)" ondrop="onTaskDrop(event,${i})" ondragend="onTaskDragEnd(event)">
      <button class="p-task-drag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/></svg>
      </button>
      <button class="p-task-expand${isOpen?' open':''}" onclick="toggleTaskExpand(${i})" style="${hasMemo&&!isOpen?'color:var(--text-primary)':''}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button class="p-task-status-btn ${t.status}" onclick="cycleTaskStatus(${i})">${sl[t.status]}</button>
      <input class="p-task-title" value="${t.title}" placeholder="タスク名..."
        oninput="updateProjectTaskField(${i},'title',this.value)"
        onkeydown="projectTaskKeydown(event,${i})">
      <select class="p-task-assignee-select" onchange="updateProjectTaskField(${i},'assignee',this.value)">
        ${memberOptions(t.assignee||'')}
      </select>
      <button class="p-task-delete" onclick="deleteProjectTask(${i})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    ${isOpen ? `<div class="p-task-detail">
      <textarea class="p-task-memo" placeholder="メモを入力..."
        oninput="updateProjectTaskField(${i},'description',this.value);autoResize(this)">${t.description||''}</textarea>
    </div>` : ''}`;
  }).join('');
  if (filtered.length === 0 && projectTasks.length > 0) {
    list.innerHTML = '<div style="font-size:13px;color:var(--text-tertiary);padding:12px 0;text-align:center">該当するタスクがありません</div>';
  }
}

// Drag & Drop
let dragIdx = null;
function onTaskDragStart(e, idx) { dragIdx = idx; e.currentTarget.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
function onTaskDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
function onTaskDragEnter(e) { e.preventDefault(); const item = e.currentTarget.closest('.p-task-item'); if (item) item.classList.add('drag-over'); }
function onTaskDragLeave(e) { const item = e.currentTarget.closest('.p-task-item'); if (item) item.classList.remove('drag-over'); }
function onTaskDragEnd(e) { document.querySelectorAll('.p-task-item').forEach(el => { el.classList.remove('dragging','drag-over'); }); dragIdx = null; }
async function onTaskDrop(e, targetIdx) {
  e.preventDefault();
  document.querySelectorAll('.p-task-item').forEach(el => el.classList.remove('drag-over'));
  if (dragIdx === null || dragIdx === targetIdx) return;
  const task = projectTasks.splice(dragIdx, 1)[0];
  projectTasks.splice(targetIdx, 0, task);
  expandedTaskIdx = null;
  projectTasks.forEach((t, i) => t.sort_order = i);
  renderProjectTaskList();
  for (let i = 0; i < projectTasks.length; i++) {
    await supabase.from('project_tasks').update({ sort_order: i }).eq('id', projectTasks[i].id);
  }
  dragIdx = null;
}

function toggleTaskExpand(idx) {
  expandedTaskIdx = expandedTaskIdx === idx ? null : idx;
  renderProjectTaskList();
  if (expandedTaskIdx !== null) {
    setTimeout(() => {
      const memo = document.querySelector('.p-task-memo');
      if (memo) autoResize(memo);
    }, 20);
  }
}

async function moveTask(idx, dir) {
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= projectTasks.length) return;
  const temp = projectTasks[idx];
  projectTasks[idx] = projectTasks[newIdx];
  projectTasks[newIdx] = temp;
  if (expandedTaskIdx === idx) expandedTaskIdx = newIdx;
  else if (expandedTaskIdx === newIdx) expandedTaskIdx = idx;
  projectTasks.forEach((t,i) => t.sort_order = i);
  renderProjectTaskList();
  for (let i = Math.min(idx,newIdx); i <= Math.max(idx,newIdx); i++) {
    await supabase.from('project_tasks').update({ sort_order: i }).eq('id', projectTasks[i].id);
  }
}

// ========== Task Menu ==========
function toggleTaskMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('taskMenuDropdown');
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open');
  if (!isOpen) {
    setTimeout(() => document.addEventListener('click', closeTaskMenuOutside, { once: true }), 0);
  }
}
function closeTaskMenu() {
  document.getElementById('taskMenuDropdown')?.classList.remove('open');
}
function closeTaskMenuOutside(e) {
  const wrap = document.querySelector('.task-menu-wrap');
  if (!wrap || !wrap.contains(e.target)) closeTaskMenu();
}

// ========== Task Import Tools ==========
function showBulkPanel() {
  const el = document.getElementById('bulkPanel');
  if (el.innerHTML) { el.innerHTML = ''; return; }
  document.getElementById('aiPanel').innerHTML = '';
  el.innerHTML = `
    <div class="bulk-panel">
      <div class="bulk-panel-title">テキストから一括追加</div>
      <div class="bulk-panel-desc">1行に1タスク。改行で区切ってください。</div>
      <textarea class="bulk-textarea" id="bulkText" placeholder="タスク1\nタスク2\nタスク3..."></textarea>
      <div class="bulk-actions">
        <button class="btn-sm" onclick="document.getElementById('bulkPanel').innerHTML=''">キャンセル</button>
        <button class="btn-primary-sm" onclick="addBulkTasks()">追加</button>
      </div>
    </div>`;
}

async function addBulkTasks() {
  const text = document.getElementById('bulkText').value.trim();
  if (!text) return;
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const p = getActiveProject(); if (!p) return;
  for (let i = 0; i < lines.length; i++) {
    const { data } = await supabase.from('project_tasks')
      .insert({ project_id: p.id, title: lines[i], sort_order: projectTasks.length + i }).select().single();
    if (data) projectTasks.push(data);
  }
  p._taskCount = projectTasks.length;
  p._doneCount = projectTasks.filter(t => t.status === 'done').length;
  document.getElementById('bulkPanel').innerHTML = '';
  renderProjectEditor();
}

async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const text = await file.text();
  let lines = [];
  if (file.name.endsWith('.csv') || file.name.endsWith('.tsv')) {
    const sep = file.name.endsWith('.tsv') ? '\t' : ',';
    lines = text.split('\n').map(l => l.split(sep)[0].trim()).filter(l => l);
    if (lines.length > 0 && (lines[0].toLowerCase() === 'name' || lines[0].toLowerCase() === 'title' || lines[0] === '名前' || lines[0] === 'タスク')) {
      lines.shift();
    }
  } else {
    lines = text.split('\n').map(l => l.replace(/^[-*•]\s*/, '').trim()).filter(l => l);
  }
  if (!lines.length) { alert('タスクが見つかりません'); return; }
  if (!confirm(`${lines.length}件のタスクを追加しますか？\n\n${lines.slice(0, 5).join('\n')}${lines.length > 5 ? '\n...' : ''}`)) return;
  const p = getActiveProject(); if (!p) return;
  for (let i = 0; i < lines.length; i++) {
    const { data } = await supabase.from('project_tasks')
      .insert({ project_id: p.id, title: lines[i], sort_order: projectTasks.length + i }).select().single();
    if (data) projectTasks.push(data);
  }
  p._taskCount = projectTasks.length;
  p._doneCount = projectTasks.filter(t => t.status === 'done').length;
  event.target.value = '';
  renderProjectEditor();
}

// Voice input
let recognition = null;
let isRecording = false;

function toggleVoiceInput() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('このブラウザは音声入力に対応していません'); return;
  }
  if (isRecording) { stopVoice(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = 'ja-JP';
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.onresult = async (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    if (transcript.trim()) {
      const lines = transcript.split(/[、。\n]/).map(l => l.trim()).filter(l => l);
      const p = getActiveProject(); if (!p) return;
      for (const line of lines) {
        const { data } = await supabase.from('project_tasks')
          .insert({ project_id: p.id, title: line, sort_order: projectTasks.length }).select().single();
        if (data) projectTasks.push(data);
      }
      p._taskCount = projectTasks.length;
      p._doneCount = projectTasks.filter(t => t.status === 'done').length;
      renderProjectEditor();
    }
  };
  recognition.onerror = (e) => { console.error('Voice error:', e); stopVoice(); };
  recognition.onend = () => { if (isRecording) recognition.start(); };
  recognition.start();
  isRecording = true;
  const btn = document.getElementById('voiceBtn');
  if (btn) { btn.classList.add('recording'); btn.querySelector('.toolbar-btn') || (btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>録音中...'); }
}

function stopVoice() {
  if (recognition) { recognition.stop(); recognition = null; }
  isRecording = false;
  renderProjectEditor();
}

// AI panel (placeholder - needs API key)
let aiApiKey = localStorage.getItem('dezainaz_ai_key') || 'AIzaSyCcTBX2cuFUqZX6aWtQQzpwvQxRCxFP8R4';

function showAiPanel() {
  const el = document.getElementById('aiPanel');
  if (el.innerHTML) { el.innerHTML = ''; return; }
  document.getElementById('bulkPanel').innerHTML = '';
  const p = getActiveProject();
  if (!aiApiKey) {
    el.innerHTML = `
      <div class="ai-panel">
        <div class="ai-panel-title">AI タスク生成</div>
        <div class="ai-panel-desc">Gemini APIキーを設定してください</div>
        <input class="settings-input" id="aiKeyInput" type="password" placeholder="Gemini API Key...">
        <div class="bulk-actions">
          <button class="btn-sm" onclick="document.getElementById('aiPanel').innerHTML=''">キャンセル</button>
          <button class="btn-primary-sm" onclick="saveAiKey()">保存</button>
        </div>
      </div>`;
    return;
  }
  el.innerHTML = `
    <div class="ai-panel">
      <div class="ai-panel-title">AI タスク生成</div>
      <div class="ai-panel-desc">プロジェクト「${p ? p.name : ''}」の内容からタスクを自動提案します</div>
      <textarea class="bulk-textarea" id="aiPrompt" placeholder="どんなタスクが必要ですか？例：LPのデザインと実装に必要なタスク"></textarea>
      <div class="bulk-actions">
        <button class="btn-sm" onclick="document.getElementById('aiPanel').innerHTML=''">キャンセル</button>
        <button class="btn-primary-sm" id="aiGenBtn" onclick="generateAiTasks()">生成</button>
      </div>
      <div id="aiResults"></div>
    </div>`;
}

function saveAiKey() {
  const key = document.getElementById('aiKeyInput').value.trim();
  if (!key) return;
  aiApiKey = key;
  localStorage.setItem('dezainaz_ai_key', key);
  showAiPanel();
}

async function generateAiTasks() {
  const prompt = document.getElementById('aiPrompt').value.trim();
  if (!prompt) return;
  const p = getActiveProject();
  const btn = document.getElementById('aiGenBtn');
  btn.textContent = '生成中...'; btn.disabled = true;
  try {
    const existingTasks = projectTasks.map(t => t.title).join(', ');
    const systemPrompt = `あなたはプロジェクト管理のアシスタントです。以下のプロジェクトに必要な大まかなタスクを提案してください。
プロジェクト名: ${p ? p.name : ''}
既存タスク: ${existingTasks || 'なし'}
ユーザーの要望: ${prompt}

重要なルール:
- 細かすぎず、大きな単位でタスクを提案すること（例: 「ボタンの色を変更」ではなく「UIデザイン」）
- 3〜8個程度に絞ること
- 既存タスクと重複しないこと
- JSONの配列形式で {"title": "タスク名"} として返すこと
- JSON配列のみを返し、他のテキストは含めないこと`;

    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${aiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    });
    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('AIの応答を解析できません');
    const suggestions = JSON.parse(jsonMatch[0]);
    const results = document.getElementById('aiResults');
    results.innerHTML = `
      <div style="margin-top:12px">
        <div style="font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:8px">提案されたタスク（チェックして追加）</div>
        ${suggestions.map((s, i) => `
          <div class="ai-suggestion-item">
            <input type="checkbox" checked id="aiSug${i}" value="${s.title}">
            <label for="aiSug${i}">${s.title}</label>
          </div>`).join('')}
        <div class="bulk-actions" style="margin-top:8px">
          <button class="btn-primary-sm" onclick="addAiSuggestions(${suggestions.length})">選択したタスクを追加</button>
        </div>
      </div>`;
  } catch (e) {
    console.error('AI error:', e);
    document.getElementById('aiResults').innerHTML = `<div style="color:var(--red);font-size:12px;margin-top:8px">エラー: ${e.message}</div>`;
  }
  btn.textContent = '生成'; btn.disabled = false;
}

async function addAiSuggestions(count) {
  const p = getActiveProject(); if (!p) return;
  const tasks = [];
  for (let i = 0; i < count; i++) {
    const cb = document.getElementById('aiSug' + i);
    if (cb && cb.checked) tasks.push(cb.value);
  }
  for (let i = 0; i < tasks.length; i++) {
    const { data } = await supabase.from('project_tasks')
      .insert({ project_id: p.id, title: tasks[i], sort_order: projectTasks.length + i }).select().single();
    if (data) projectTasks.push(data);
  }
  p._taskCount = projectTasks.length;
  p._doneCount = projectTasks.filter(t => t.status === 'done').length;
  document.getElementById('aiPanel').innerHTML = '';
  renderProjectEditor();
}

function updateProjectField(field, value) {
  const p = getActiveProject(); if (!p) return;
  const prevStatus = p.status;
  p[field]=value; saveProjectToDb();
  if (field === 'status' && value !== prevStatus) {
    const sl={active:'進行中',on_hold:'保留',completed:'完了',cancelled:'中止'};
    sendNotification('project_status_changed', `📊 [${p.name}] ステータスが ${sl[prevStatus]} → ${sl[value]} に変更されました`);
  }
}

async function addProjectTask() {
  const p = getActiveProject(); if (!p) return;
  const { data, error } = await supabase.from('project_tasks')
    .insert({project_id:p.id, title:'', sort_order:projectTasks.length}).select().single();
  if (error) { console.error('Add task error:',error); return; }
  projectTasks.push(data);
  p._taskCount=projectTasks.length;
  p._doneCount=projectTasks.filter(t=>t.status==='done').length;
  renderProjectEditor();
  setTimeout(()=>{ const inputs=document.querySelectorAll('.p-task-title'); if(inputs.length) inputs[inputs.length-1].focus(); },50);
}

function cycleTaskStatus(idx) {
  const next={todo:'in_progress',in_progress:'done',done:'todo'};
  const prevStatus = projectTasks[idx].status;
  projectTasks[idx].status=next[projectTasks[idx].status];
  saveProjectTask(idx);
  const p=getActiveProject();
  if(p) p._doneCount=projectTasks.filter(t=>t.status==='done').length;
  renderProjectEditor();
  const sl={todo:'未着手',in_progress:'進行中',done:'完了'};
  const pName = p ? p.name : '';
  sendNotification('task_status_changed', `🔄 [${pName}] 「${projectTasks[idx].title}」${sl[prevStatus]} → ${sl[projectTasks[idx].status]}`);
  if (projectTasks[idx].status === 'done') {
    projectTasks[idx].completed_by = currentUser;
    projectTasks[idx].completed_at = new Date().toISOString();
    sendNotification('task_completed', `🎉 [${pName}] 「${projectTasks[idx].title}」が完了しました`);
  } else {
    projectTasks[idx].completed_by = null;
    projectTasks[idx].completed_at = null;
  }
}

function updateProjectTaskField(idx,field,value) { projectTasks[idx][field]=value; saveProjectTask(idx); }

function saveProjectTask(idx) {
  const task=projectTasks[idx];
  if(task._saveTimer) clearTimeout(task._saveTimer);
  task._saveTimer=setTimeout(async()=>{
    await supabase.from('project_tasks').update({
      title:task.title, status:task.status, assignee:task.assignee||null,
      description:task.description||'', due_date:task.due_date||null,
      progress:task.progress||0, completed_by:task.completed_by||null,
      completed_at:task.completed_at||null, updated_at:new Date().toISOString()
    }).eq('id',task.id);
    renderProjectList();
  },400);
}

async function deleteProjectTask(idx) {
  const task=projectTasks[idx];
  await supabase.from('project_tasks').delete().eq('id',task.id);
  projectTasks.splice(idx,1);
  const p=getActiveProject();
  if(p) { p._taskCount=projectTasks.length; p._doneCount=projectTasks.filter(t=>t.status==='done').length; }
  renderProjectEditor();
}

function projectTaskKeydown(e,idx) {
  if(e.key==='Enter'){e.preventDefault();addProjectTask();}
  if(e.key==='Backspace'&&e.target.value===''){e.preventDefault();deleteProjectTask(idx);}
}

// ========== Mobile ==========
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.querySelector('.sidebar-overlay').classList.toggle('active');
}
function closeSidebarMobile() {
  document.getElementById('sidebar').classList.remove('open');
  document.querySelector('.sidebar-overlay').classList.remove('active');
}

// ========== Global ==========
Object.assign(window, {
  createNewReport, selectReport, deleteReport,
  switchUser, addTask, toggleTask, updateTaskText,
  removeTask, taskKeydown, updateTime, setNow,
  updateNotes, submitReport, toggleSidebar, autoResize,
  switchView, createNewProject, selectProject, deleteProject,
  updateProjectField, addProjectTask, cycleTaskStatus,
  updateProjectTaskField, deleteProjectTask, projectTaskKeydown,
  toggleTitleDropdown, openSettings, closeSettings,
  addMember, removeMember, memberOptions,
  toggleTaskExpand, moveTask,
  setTaskFilter, setTaskAssigneeFilter, setTaskSort,
  onTaskDragStart, onTaskDragOver, onTaskDragEnter, onTaskDragLeave, onTaskDragEnd, onTaskDrop,
  switchSettingsTab, addMemberFromSettings,
  addNotifSetting, updateNotifSetting, toggleNotifSetting,
  deleteNotifSetting, toggleGlobalTrigger,
  showWebhookHelp, toggleTaskMenu, closeTaskMenu, aiReflectDones,
  toggleAiChat, sendAiChat,
  inviteProjectMember, removeProjectMember,
  loadPages, createNewPage, selectPage, deletePage,
  updatePageField, cyclePageIcon,
  showBulkPanel, addBulkTasks, handleFileUpload,
  toggleVoiceInput, stopVoice,
  showAiPanel, saveAiKey, generateAiTasks, addAiSuggestions
});

// ========== AI Chat Bot ==========
let aiChatHistory = [];

function toggleAiChat() {
  const panel = document.getElementById('aiChatPanel');
  const fab = document.querySelector('.ai-fab');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) {
    document.getElementById('aiChatInput').focus();
    if (fab) fab.style.display = 'none';
  } else {
    if (fab) fab.style.display = '';
  }
}

async function sendAiChat() {
  const input = document.getElementById('aiChatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  // Show user message
  appendChatMsg('user', msg);
  appendChatMsg('typing', '考え中...');

  const btn = document.getElementById('aiChatSendBtn');
  btn.disabled = true;

  try {
    // Build context
    const ctx = await buildAiContext();
    aiChatHistory.push({ role: 'user', parts: [{ text: msg }] });

    const systemPrompt = `あなたはDezainaz社内ツールのAIアシスタントです。ユーザーの指示に従い、データを操作してください。

現在のコンテキスト:
${ctx}

利用可能なアクション（JSON配列で返してください）:
- {"action":"add_task","project_id":"...","title":"...","assignee":"..."} — タスク追加
- {"action":"update_task","task_id":"...","fields":{"title":"...","status":"todo|in_progress|done","assignee":"...","description":"..."}} — タスク更新
- {"action":"delete_task","task_id":"..."} — タスク削除
- {"action":"add_project","name":"...","description":"..."} — プロジェクト追加
- {"action":"update_project","project_id":"...","fields":{"name":"...","status":"active|on_hold|completed|cancelled","priority":"low|medium|high","description":"..."}} — プロジェクト更新
- {"action":"delete_project","project_id":"..."} — プロジェクト削除
- {"action":"add_report","date":"YYYY-MM-DD","username":"..."} — 日報作成
- {"action":"update_report","report_id":"...","fields":{"start_time":"HH:MM","end_time":"HH:MM","notes":"...","todos":[{"text":"...","done":false}],"dones":[{"text":"...","done":true}]}} — 日報更新
- {"action":"add_member","name":"..."} — メンバー追加
- {"action":"add_page","title":"...","content":"...","icon":"📄"} — メモページ作成
- {"action":"update_page","page_id":"...","fields":{"title":"...","content":"...","icon":"..."}} — メモページ更新
- {"action":"reply","message":"..."} — テキスト返信のみ

必ず以下のJSON形式で返してください:
{"reply":"ユーザーへの返答テキスト","actions":[...アクション配列（不要なら空配列）]}

アクションが不要な質問の場合はreplyのみでactionsは空配列にしてください。
削除は確認してからにしてください（replyで確認を求め、ユーザーが同意したらアクションを実行）。`;

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: '{"reply":"了解しました。何でも指示してください。","actions":[]}' }] },
      ...aiChatHistory
    ];

    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${aiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });
    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('応答を解析できません');
    const parsed = JSON.parse(jsonMatch[0]);

    removeChatTyping();

    // Execute actions
    if (parsed.actions && parsed.actions.length > 0) {
      for (const act of parsed.actions) {
        await executeAiAction(act);
      }
      const actionSummary = parsed.actions.map(a => `✓ ${a.action}`).join('\n');
      appendChatMsg('bot', parsed.reply + '\n\n' + actionSummary);
    } else {
      appendChatMsg('bot', parsed.reply);
    }

    aiChatHistory.push({ role: 'model', parts: [{ text }] });

    // Refresh views immediately
    await loadTeamMembers();
    if (currentView === 'report') {
      await loadReports();
      if (activeId) renderEditor();
    } else if (currentView === 'project') {
      await loadProjects();
      if (activeProjectId) {
        await loadProjectTasks(activeProjectId);
      }
    } else if (currentView === 'pages') {
      await loadPages();
      if (activePageId) renderPageEditor();
    }
    // Also check if actions affected the other view
    const hasProjectAction = parsed.actions.some(a => ['add_task','update_task','delete_task','add_project','update_project','delete_project'].includes(a.action));
    const hasReportAction = parsed.actions.some(a => ['add_report','update_report'].includes(a.action));
    if (hasProjectAction && currentView !== 'project') {
      // Pre-load so it's fresh when switching
      const { data: pData } = await supabase.from('projects').select('*').order('created_at',{ascending:false});
      projects = pData || [];
    }
    if (hasReportAction && currentView !== 'report') {
      const { data: rData } = await supabase.from('daily_reports').select('*').eq('username',currentUser).order('date',{ascending:false});
      reports = (rData||[]).map(mapRow);
    }

  } catch (e) {
    console.error('AI Chat error:', e);
    removeChatTyping();
    appendChatMsg('bot', 'エラーが発生しました: ' + e.message);
  }
  btn.disabled = false;
}

async function buildAiContext() {
  const parts = [];
  parts.push(`現在のユーザー: ${currentUser}`);
  parts.push(`現在のビュー: ${currentView}`);
  parts.push(`チームメンバー: ${teamMembers.map(m=>m.name).join(', ')}`);
  parts.push(`今日: ${todayStr()}`);

  // Projects
  const { data: allProjects } = await supabase.from('projects').select('id,name,status,priority,description,start_date,due_date').order('created_at',{ascending:false});
  if (allProjects && allProjects.length) {
    parts.push(`\nプロジェクト一覧:`);
    for (const p of allProjects) {
      const { data: tasks } = await supabase.from('project_tasks').select('id,title,status,assignee,description').eq('project_id',p.id).order('sort_order');
      const sl = {active:'進行中',on_hold:'保留',completed:'完了',cancelled:'中止'};
      parts.push(`- [${p.id}] ${p.name} (${sl[p.status]}, 優先度:${p.priority})`);
      if (tasks) {
        const tsl = {todo:'未着手',in_progress:'進行中',done:'完了'};
        tasks.forEach(t => {
          parts.push(`  - [${t.id}] ${t.title} (${tsl[t.status]}, 担当:${t.assignee||'未割当'}${t.description?', メモ:'+t.description.slice(0,30):''})`);
        });
      }
    }
  }

  // Recent reports
  const { data: recentReports } = await supabase.from('daily_reports').select('id,date,username,start_time,end_time,notes').order('date',{ascending:false}).limit(5);
  if (recentReports && recentReports.length) {
    parts.push(`\n最近の日報:`);
    recentReports.forEach(r => {
      parts.push(`- [${r.id}] ${r.date} ${r.username} (${r.start_time||'未開始'}〜${r.end_time||'未終了'})`);
    });
  }

  return parts.join('\n');
}

async function executeAiAction(act) {
  switch (act.action) {
    case 'add_task': {
      const { data } = await supabase.from('project_tasks')
        .insert({ project_id: act.project_id, title: act.title, assignee: act.assignee || null, sort_order: 999 })
        .select().single();
      break;
    }
    case 'update_task': {
      if (act.fields) {
        await supabase.from('project_tasks').update({ ...act.fields, updated_at: new Date().toISOString() }).eq('id', act.task_id);
      }
      break;
    }
    case 'delete_task': {
      await supabase.from('project_tasks').delete().eq('id', act.task_id);
      break;
    }
    case 'add_project': {
      await supabase.from('projects').insert({ name: act.name, description: act.description || '', created_by: currentUser }).select().single();
      break;
    }
    case 'update_project': {
      if (act.fields) {
        await supabase.from('projects').update({ ...act.fields, updated_at: new Date().toISOString() }).eq('id', act.project_id);
      }
      break;
    }
    case 'delete_project': {
      await supabase.from('projects').delete().eq('id', act.project_id);
      break;
    }
    case 'add_report': {
      await supabase.from('daily_reports').insert({ date: act.date, username: act.username || currentUser }).select().single();
      break;
    }
    case 'update_report': {
      if (act.fields) {
        await supabase.from('daily_reports').update(act.fields).eq('id', act.report_id);
      }
      break;
    }
    case 'add_member': {
      await supabase.from('team_members').insert({ name: act.name }).select().single();
      break;
    }
    case 'add_page': {
      await supabase.from('pages').insert({ title: act.title || '', content: act.content || '', icon: act.icon || '📄', created_by: currentUser }).select().single();
      break;
    }
    case 'update_page': {
      if (act.fields) await supabase.from('pages').update({ ...act.fields, updated_at: new Date().toISOString() }).eq('id', act.page_id);
      break;
    }
  }
}

function appendChatMsg(type, text) {
  const el = document.getElementById('aiChatMessages');
  const div = document.createElement('div');
  div.className = 'ai-msg ' + type;
  div.textContent = text;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

function removeChatTyping() {
  const el = document.getElementById('aiChatMessages');
  const typing = el.querySelector('.ai-msg.typing');
  if (typing) typing.remove();
}

// ========== Realtime ==========
function setupRealtime() {
  supabase.channel('db-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'daily_reports' }, () => {
      if (currentView === 'report') loadReports();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
      if (currentView === 'project') loadProjects();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'project_tasks' }, () => {
      if (currentView === 'project' && activeProjectId) loadProjectTasks(activeProjectId);
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'team_members' }, () => {
      loadTeamMembers();
    })
    .subscribe();
}

// ========== Init ==========
document.getElementById('newReportDate').value = todayStr();
await loadTeamMembers();
await loadNotifSettings();
// Preload projects for timeline project picker
const { data: preProjects } = await supabase.from('projects').select('*').order('created_at',{ascending:false});
projects = preProjects || [];
loadReports();
setupRealtime();
