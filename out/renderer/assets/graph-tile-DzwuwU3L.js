import { r as reactExports, j as jsxRuntimeExports, c as clientExports } from "./client-BHfaboi_.js";
import { i as initDarkMode } from "./dark-mode-LJlL8nTc.js";
import { i as isImageFile } from "./image-D9HZFqAz.js";
import { F as ForceDirectedGraph } from "./WorkspaceGraph-x3Z9DR66.js";
/* empty css               */
const ROOT_FILES_KEY = "\0root";
function buildHueMap(filePaths) {
  const root2 = { children: /* @__PURE__ */ new Map(), hue: 0 };
  let hasRootFiles = false;
  for (const filePath of filePaths) {
    const parts = filePath.split("/");
    if (parts.length === 1) {
      hasRootFiles = true;
    } else {
      let current = root2;
      for (let i = 0; i < parts.length - 1; i++) {
        const segment = parts[i];
        if (!current.children.has(segment)) {
          current.children.set(segment, {
            name: segment,
            children: /* @__PURE__ */ new Map(),
            hue: 0
          });
        }
        current = current.children.get(segment);
      }
    }
  }
  if (hasRootFiles) {
    root2.children.set(ROOT_FILES_KEY, {
      name: ROOT_FILES_KEY,
      children: /* @__PURE__ */ new Map(),
      hue: 0
    });
  }
  assignHues(root2, 0, 360);
  const rootHue = root2.children.get(ROOT_FILES_KEY)?.hue ?? -1;
  const hueMap = /* @__PURE__ */ new Map();
  for (const filePath of filePaths) {
    const parts = filePath.split("/");
    if (parts.length === 1) {
      hueMap.set(filePath, rootHue);
      continue;
    }
    let current = root2;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current.children.get(parts[i]);
    }
    hueMap.set(filePath, current.hue);
  }
  return hueMap;
}
function assignHues(node, rangeStart, rangeEnd) {
  const children = Array.from(node.children.values());
  if (children.length === 0) return;
  const sliceSize = (rangeEnd - rangeStart) / children.length;
  for (let i = 0; i < children.length; i++) {
    const childStart = rangeStart + i * sliceSize;
    const childEnd = childStart + sliceSize;
    children[i].hue = (childStart + childEnd) / 2;
    assignHues(children[i], childStart, childEnd);
  }
}
function hueToColor(hue, isDark) {
  if (hue < 0) {
    return isDark ? "hsl(0, 0%, 60%)" : "hsl(0, 0%, 55%)";
  }
  const saturation = isDark ? 60 : 70;
  const lightness = isDark ? 65 : 45;
  return `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`;
}
const CODE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".py",
  ".pyi"
]);
function nodeTypeForPath(path) {
  const dot = path.lastIndexOf(".");
  if (dot === -1) return "file";
  const ext = path.slice(dot);
  return CODE_EXTENSIONS.has(ext) ? "code" : "file";
}
function titleForPath(path) {
  const slash = path.lastIndexOf("/");
  return slash === -1 ? path : path.slice(slash + 1);
}
function linkKey(source, target, linkType) {
  return `${source}|${target}|${linkType}`;
}
function buildGraphAtIndex(targetIndex, commits, checkpoints) {
  let nearestIdx = -1;
  for (const idx of checkpoints.keys()) {
    if (idx <= targetIndex && idx > nearestIdx) {
      nearestIdx = idx;
    }
  }
  const files = /* @__PURE__ */ new Set();
  const links = /* @__PURE__ */ new Map();
  if (nearestIdx >= 0) {
    const cp = checkpoints.get(nearestIdx);
    for (const f of cp.files) files.add(f);
    for (const l of cp.links) {
      const key = linkKey(l.source, l.target, l.linkType);
      links.set(key, l);
    }
  }
  const startIdx = nearestIdx >= 0 ? nearestIdx + 1 : 0;
  for (let i = startIdx; i <= targetIndex; i++) {
    const commit = commits[i];
    if (!commit) continue;
    applyCommitChanges(commit, files, links);
  }
  const nodes = [];
  for (const path of files) {
    nodes.push({
      id: path,
      title: titleForPath(path),
      path,
      nodeType: nodeTypeForPath(path)
    });
  }
  const graphLinks = [];
  for (const entry of links.values()) {
    if (files.has(entry.source) && files.has(entry.target)) {
      graphLinks.push({
        source: entry.source,
        target: entry.target,
        linkType: entry.linkType
      });
    }
  }
  return { nodes, links: graphLinks };
}
function applyCommitChanges(commit, files, links) {
  for (const fc of commit.fileChanges) {
    switch (fc.status) {
      case "A":
        files.add(fc.path);
        break;
      case "D":
        files.delete(fc.path);
        break;
      case "M":
        break;
      case "R":
        if (fc.oldPath) files.delete(fc.oldPath);
        files.add(fc.path);
        break;
    }
  }
  for (const lc of commit.linkChanges) {
    const key = linkKey(lc.source, lc.target, lc.linkType);
    if (lc.action === "add") {
      links.set(key, {
        source: lc.source,
        target: lc.target,
        linkType: lc.linkType
      });
    } else {
      links.delete(key);
    }
  }
}
function useReplayEngine() {
  const [commits, setCommits] = reactExports.useState([]);
  const [checkpoints, setCheckpoints] = reactExports.useState(/* @__PURE__ */ new Map());
  const [currentIndex, setCurrentIndex] = reactExports.useState(-1);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isGitRepo, setIsGitRepo] = reactExports.useState(false);
  const [totalCommits, setTotalCommits] = reactExports.useState(null);
  const commitsRef = reactExports.useRef(commits);
  commitsRef.current = commits;
  const currentIndexRef = reactExports.useRef(currentIndex);
  const isLoadingRef = reactExports.useRef(isLoading);
  const isPlayingRef = reactExports.useRef(isPlaying);
  const unsubRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  const stop = reactExports.useCallback(() => {
    if (unsubRef.current) {
      unsubRef.current();
      unsubRef.current = null;
    }
    window.api.stopReplay().catch((err) => {
      console.warn("stopReplay failed:", err);
    });
    isLoadingRef.current = false;
    setIsLoading(false);
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);
  const start = reactExports.useCallback(
    (workspacePath) => {
      if (unsubRef.current) {
        unsubRef.current();
        unsubRef.current = null;
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isPlayingRef.current = false;
      setIsPlaying(false);
      commitsRef.current = [];
      setCommits([]);
      setCheckpoints(/* @__PURE__ */ new Map());
      currentIndexRef.current = -1;
      setCurrentIndex(-1);
      setTotalCommits(null);
      setIsGitRepo(false);
      window.api.startReplay({ workspacePath }).then(
        (isGit) => {
          if (!isGit) {
            isLoadingRef.current = false;
            setIsLoading(false);
            return;
          }
          setIsGitRepo(true);
          isLoadingRef.current = true;
          setIsLoading(true);
          unsubRef.current = window.api.onReplayData(
            (msg) => {
              if (msg.workspacePath !== workspacePath) return;
              switch (msg.type) {
                case "meta":
                  setTotalCommits(msg.data.totalCommits);
                  break;
                case "commit":
                  setCommits((prev) => [...prev, msg.data]);
                  break;
                case "checkpoint":
                  setCheckpoints((prev) => {
                    const next = new Map(prev);
                    next.set(msg.data.commitIndex, msg.data);
                    return next;
                  });
                  break;
                case "complete":
                  setCommits(
                    (prev) => [...prev].sort(
                      (a, b) => a.timestamp - b.timestamp
                    )
                  );
                  isLoadingRef.current = false;
                  setIsLoading(false);
                  break;
              }
            }
          );
        },
        (err) => {
          console.warn("startReplay failed:", err);
        }
      );
    },
    []
  );
  reactExports.useEffect(() => {
    return () => {
      if (unsubRef.current) {
        unsubRef.current();
        unsubRef.current = null;
      }
      window.api.stopReplay().catch((err) => {
        console.warn("stopReplay failed:", err);
      });
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  const currentGraphData = reactExports.useMemo(() => {
    if (currentIndex < 0) return null;
    if (commits.length === 0) return null;
    const clamped = Math.min(
      currentIndex,
      commits.length - 1
    );
    return buildGraphAtIndex(clamped, commits, checkpoints);
  }, [currentIndex, commits, checkpoints]);
  const modifiedFiles = reactExports.useMemo(() => {
    if (currentIndex < 0 || currentIndex >= commits.length) {
      return /* @__PURE__ */ new Set();
    }
    const commit = commits[currentIndex];
    if (!commit) return /* @__PURE__ */ new Set();
    const paths = /* @__PURE__ */ new Set();
    for (const fc of commit.fileChanges) {
      if (fc.status === "M") paths.add(fc.path);
    }
    return paths;
  }, [currentIndex, commits]);
  const liveTimeRange = reactExports.useMemo(() => {
    if (commits.length === 0) return null;
    return [
      commits[0].timestamp,
      commits[commits.length - 1].timestamp
    ];
  }, [commits]);
  const stableTimeRange = reactExports.useRef(liveTimeRange);
  if (!isPlaying || stableTimeRange.current === null) {
    stableTimeRange.current = liveTimeRange;
  }
  const timeRange = stableTimeRange.current;
  const seekTo = reactExports.useCallback(
    (index) => {
      if (commitsRef.current.length === 0) return;
      const max = commitsRef.current.length - 1;
      const clamped = Math.max(0, Math.min(index, max));
      currentIndexRef.current = clamped;
      setCurrentIndex(clamped);
    },
    []
  );
  const seekToLive = reactExports.useCallback(() => {
    currentIndexRef.current = -1;
    setCurrentIndex(-1);
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);
  const pause = reactExports.useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);
  const play = reactExports.useCallback(() => {
    const c = commitsRef.current;
    if (c.length === 0) return;
    let startIdx = currentIndexRef.current;
    if (startIdx < 0) startIdx = 0;
    if (startIdx >= c.length - 1 && !isLoadingRef.current) {
      startIdx = 0;
    }
    currentIndexRef.current = startIdx;
    setCurrentIndex(startIdx);
    isPlayingRef.current = true;
    setIsPlaying(true);
    const totalSpan = c.length >= 2 ? c[c.length - 1].timestamp - c[0].timestamp : 1;
    const speedMultiplier = Math.max(totalSpan / 1e4, 1);
    let lastFrameTime = null;
    let accumulated = 0;
    let prevTickIdx = startIdx;
    c[startIdx]?.timestamp ?? 0;
    function tick(now) {
      if (!isPlayingRef.current) return;
      const idx = currentIndexRef.current;
      const allCommits = commitsRef.current;
      if (idx !== prevTickIdx) {
        prevTickIdx = idx;
        allCommits[idx]?.timestamp ?? 0;
      }
      if (idx >= allCommits.length - 1) {
        if (isLoadingRef.current) {
          isPlayingRef.current = false;
          setIsPlaying(false);
          rafRef.current = null;
          return;
        }
        currentIndexRef.current = -1;
        setCurrentIndex(-1);
        isPlayingRef.current = false;
        setIsPlaying(false);
        rafRef.current = null;
        return;
      }
      if (lastFrameTime === null) {
        lastFrameTime = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - lastFrameTime;
      lastFrameTime = now;
      accumulated += elapsed;
      const current = allCommits[idx];
      const next = allCommits[idx + 1];
      if (!current || !next) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const realGap = Math.abs(
        next.timestamp - current.timestamp
      );
      const delay = Math.min(
        2e3,
        Math.max(16, realGap / speedMultiplier)
      );
      if (accumulated >= delay) {
        accumulated = 0;
        currentIndexRef.current = idx + 1;
        setCurrentIndex(idx + 1);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);
  return {
    commits,
    currentIndex,
    isPlaying,
    isLoading,
    isGitRepo,
    totalCommits,
    currentGraphData,
    modifiedFiles,
    timeRange,
    play,
    pause,
    seekTo,
    seekToLive,
    start,
    stop
  };
}
const RING_CIRCUMFERENCE = 2 * Math.PI * 20;
const MS_PER_DAY = 864e5;
const MS_PER_MONTH = 30 * MS_PER_DAY;
const MS_PER_YEAR = 365 * MS_PER_DAY;
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function computeDateLabels(timeRange, trackWidth) {
  const [start, end] = timeRange;
  const span = end - start;
  if (span <= 0 || trackWidth <= 0) return [];
  const labels = [];
  const minLabelSpacing = 60;
  const maxLabels = Math.floor(trackWidth / minLabelSpacing);
  if (span > MS_PER_YEAR * 2) {
    addYearLabels(start, end, span, maxLabels, labels);
  } else if (span > MS_PER_MONTH * 3) {
    addMonthLabels(start, end, span, maxLabels, labels);
  } else {
    addDayLabels(start, end, span, maxLabels, labels);
  }
  return labels;
}
function addYearLabels(start, end, span, maxLabels, labels) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const step = Math.max(
    1,
    Math.ceil((endYear - startYear + 1) / maxLabels)
  );
  for (let y = startYear; y <= endYear; y += step) {
    const ts = new Date(y, 0, 1).getTime();
    if (ts >= start && ts <= end) {
      labels.push({
        position: (ts - start) / span,
        text: String(y)
      });
    }
  }
}
function addMonthLabels(start, end, span, maxLabels, labels) {
  const startDate = new Date(start);
  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const totalMonths = Math.ceil(span / MS_PER_MONTH);
  const step = Math.max(1, Math.ceil(totalMonths / maxLabels));
  for (let i = 0; i < totalMonths + step; i += step) {
    const m = month + i;
    const y = year + Math.floor(m / 12);
    const mNorm = m % 12;
    const ts = new Date(y, mNorm, 1).getTime();
    if (ts < start) continue;
    if (ts > end) break;
    const text = mNorm === 0 ? `${MONTH_NAMES[mNorm]} ${y}` : MONTH_NAMES[mNorm];
    labels.push({ position: (ts - start) / span, text });
  }
}
function addDayLabels(start, end, span, maxLabels, labels) {
  const totalDays = Math.ceil(span / MS_PER_DAY);
  const step = Math.max(1, Math.ceil(totalDays / maxLabels));
  const startDate = new Date(start);
  startDate.setHours(0, 0, 0, 0);
  const baseTs = startDate.getTime();
  for (let d = 0; d <= totalDays + step; d += step) {
    const ts = baseTs + d * MS_PER_DAY;
    if (ts < start) continue;
    if (ts > end) break;
    const date = new Date(ts);
    const text = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
    labels.push({ position: (ts - start) / span, text });
  }
}
function formatDate(timestamp) {
  const d = new Date(timestamp);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function truncate(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "…";
}
function findNearestCommitIndex(commits, targetTimestamp) {
  if (commits.length === 0) return -1;
  let bestIdx = 0;
  let bestDist = Math.abs(
    commits[0].timestamp - targetTimestamp
  );
  for (let i = 1; i < commits.length; i++) {
    const dist = Math.abs(
      commits[i].timestamp - targetTimestamp
    );
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }
  return bestIdx;
}
function useTimelineDrag(trackRef, timeRange, commits, isPlaying, onPause, onSeekTo) {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const isDraggingRef = reactExports.useRef(false);
  const seekFromClientX = reactExports.useCallback(
    (clientX) => {
      const el = trackRef.current;
      if (!el || !timeRange) return;
      const rect = el.getBoundingClientRect();
      const fraction = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const [start, end] = timeRange;
      const ts = start + fraction * (end - start);
      const idx = findNearestCommitIndex(commits, ts);
      if (idx >= 0) onSeekTo(idx);
    },
    [trackRef, timeRange, commits, onSeekTo]
  );
  const handleMouseDown = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      isDraggingRef.current = true;
      if (isPlaying) onPause();
      seekFromClientX(e.clientX);
    },
    [isPlaying, onPause, seekFromClientX]
  );
  reactExports.useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e) => {
      seekFromClientX(e.clientX);
    };
    const handleUp = () => {
      setIsDragging(false);
      isDraggingRef.current = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, seekFromClientX]);
  return { isDraggingRef, handleMouseDown };
}
function useTimelineHover(trackRef, isDraggingRef, timeRange, trackWidth, commits) {
  const [hoverX, setHoverX] = reactExports.useState(null);
  const handleTrackHover = reactExports.useCallback(
    (e) => {
      if (isDraggingRef.current) return;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setHoverX(e.clientX - rect.left);
    },
    [isDraggingRef, trackRef]
  );
  const handleTrackLeave = reactExports.useCallback(() => {
    if (!isDraggingRef.current) setHoverX(null);
  }, [isDraggingRef]);
  const hoveredCommit = reactExports.useMemo(() => {
    if (hoverX === null || !timeRange || trackWidth <= 0) {
      return null;
    }
    const fraction = hoverX / trackWidth;
    const [start, end] = timeRange;
    const ts = start + fraction * (end - start);
    const idx = findNearestCommitIndex(commits, ts);
    if (idx < 0) return null;
    return { index: idx, commit: commits[idx] };
  }, [hoverX, timeRange, trackWidth, commits]);
  return { hoverX, hoveredCommit, handleTrackHover, handleTrackLeave };
}
function ReplayTimeline({
  commits,
  currentIndex,
  isPlaying,
  isLoading,
  totalCommits,
  timeRange,
  onPlay,
  onPause,
  onSeekTo,
  onSeekToLive
}) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const trackRef = reactExports.useRef(null);
  const [trackWidth, setTrackWidth] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setTrackWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const { isDraggingRef, handleMouseDown } = useTimelineDrag(
    trackRef,
    timeRange,
    commits,
    isPlaying,
    onPause,
    onSeekTo
  );
  const { hoverX, hoveredCommit, handleTrackHover, handleTrackLeave } = useTimelineHover(
    trackRef,
    isDraggingRef,
    timeRange,
    trackWidth,
    commits
  );
  const commitPositions = reactExports.useMemo(() => {
    if (!timeRange || commits.length === 0) return [];
    const [start, end] = timeRange;
    const span = end - start;
    if (span <= 0) {
      return commits.map(() => 0.5);
    }
    return commits.map(
      (c) => (c.timestamp - start) / span
    );
  }, [commits, timeRange]);
  const dateLabels = reactExports.useMemo(
    () => timeRange ? computeDateLabels(timeRange, trackWidth) : [],
    [timeRange, trackWidth]
  );
  const playheadPosition = reactExports.useMemo(() => {
    if (currentIndex === -1) return 1;
    if (currentIndex >= 0 && currentIndex < commitPositions.length) {
      return commitPositions[currentIndex];
    }
    return 1;
  }, [currentIndex, commitPositions]);
  const handlePlayPause = reactExports.useCallback(() => {
    if (isPlaying) {
      onPause();
    } else {
      if (currentIndex === -1 && commits.length > 0) {
        onSeekTo(0);
      }
      onPlay();
    }
  }, [
    isPlaying,
    currentIndex,
    commits.length,
    onPlay,
    onPause,
    onSeekTo
  ]);
  const handleOpen = reactExports.useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleClose = reactExports.useCallback(() => {
    onSeekToLive();
    setIsOpen(false);
  }, [onSeekToLive]);
  const playDisabled = isLoading;
  const showProgress = isLoading && totalCommits !== null && totalCommits > 0;
  const progressFraction = showProgress ? commits.length / totalCommits : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "replay-timeline" + (isOpen ? " replay-timeline--expanded" : " replay-timeline--collapsed") + (isLoading ? " replay-timeline--loading" : ""),
      onClick: isOpen || isLoading ? void 0 : handleOpen,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "replay-timeline-trigger",
            "aria-label": "Open git history",
            tabIndex: isOpen || isLoading ? -1 : 0,
            disabled: isLoading,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClockIcon, {})
          }
        ),
        isLoading && !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "replay-timeline-loading-ring", viewBox: "0 0 44 44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "22",
            cy: "22",
            r: "20",
            strokeDasharray: RING_CIRCUMFERENCE,
            strokeDashoffset: RING_CIRCUMFERENCE * (1 - progressFraction)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "replay-timeline-contents", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "replay-timeline-pill-btn",
              onClick: handlePlayPause,
              disabled: playDisabled,
              "aria-label": isPlaying ? "Pause" : "Play",
              children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(PauseIcon, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(PlayIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "replay-timeline-track-area",
              ref: trackRef,
              onMouseDown: handleMouseDown,
              onMouseMove: handleTrackHover,
              onMouseLeave: handleTrackLeave,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "replay-timeline-track", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "replay-timeline-rail" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "replay-timeline-rail-fill",
                      style: { width: `${playheadPosition * 100}%` }
                    }
                  ),
                  commitPositions.map((pos, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "replay-timeline-tick" + (currentIndex !== -1 && i > currentIndex ? " replay-timeline-tick--unplayed" : ""),
                      style: { left: `${pos * 100}%` }
                    },
                    i
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "replay-timeline-playhead",
                      style: {
                        left: `${playheadPosition * 100}%`
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "replay-timeline-labels", children: [
                  dateLabels.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "replay-timeline-label",
                      style: { left: `${label.position * 100}%` },
                      children: label.text
                    },
                    i
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "replay-timeline-label replay-timeline-label-now",
                      style: { left: "100%" },
                      children: "Now"
                    }
                  )
                ] }),
                hoveredCommit && hoverX !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    commit: hoveredCommit.commit,
                    trackX: hoverX,
                    trackWidth
                  }
                ) : isPlaying && currentIndex >= 0 && currentIndex < commits.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    commit: commits[currentIndex],
                    trackX: playheadPosition * trackWidth,
                    trackWidth
                  }
                ) : null,
                showProgress && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "replay-timeline-progress",
                    style: {
                      width: `${progressFraction * 100}%`
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "replay-timeline-pill-btn replay-timeline-close-btn",
              onClick: handleClose,
              "aria-label": "Close history",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {})
            }
          )
        ] })
      ]
    }
  );
}
function PlayIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "3,1 12,7 3,13" }) });
}
function PauseIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "1", width: "3.5", height: "12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "8.5", y: "1", width: "3.5", height: "12" })
  ] });
}
function ClockIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "12,6 12,12 8,14" })
  ] });
}
function CloseIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "2", y1: "2", x2: "12", y2: "12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "2", x2: "2", y2: "12" })
  ] });
}
function Tooltip({
  commit,
  trackX,
  trackWidth
}) {
  const tooltipRef = reactExports.useRef(null);
  const [offset, setOffset] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const el = tooltipRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const half = w / 2;
    const leftEdge = trackX - half;
    const rightEdge = trackX + half;
    if (leftEdge < 0) {
      setOffset(-leftEdge);
    } else if (rightEdge > trackWidth) {
      setOffset(trackWidth - rightEdge);
    } else {
      setOffset(0);
    }
  }, [trackX, trackWidth]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: tooltipRef,
      className: "replay-timeline-tooltip",
      style: {
        left: `${trackX + offset}px`,
        bottom: "100%",
        transform: "translateX(-50%)",
        marginBottom: "4px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "replay-timeline-tooltip-hash", children: commit.hash.slice(0, 7) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "replay-timeline-tooltip-subject", children: truncate(commit.subject, 60) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "replay-timeline-tooltip-meta", children: [
          commit.author,
          " ·",
          " ",
          formatDate(commit.timestamp)
        ] })
      ]
    }
  );
}
function WorkspaceGraph({
  workspacePath,
  onSelectFile,
  theme,
  hidden = false,
  scopePath
}) {
  const [graphData, setGraphData] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const containerRef = reactExports.useRef(null);
  const graphRef = reactExports.useRef(null);
  const [dimensions, setDimensions] = reactExports.useState({ width: 0, height: 0 });
  const canvasRef = reactExports.useRef(null);
  const [agentSessions, setAgentSessions] = reactExports.useState(/* @__PURE__ */ new Map());
  const [, setTick] = reactExports.useState(0);
  const replay = useReplayEngine();
  const [pulsingFiles, setPulsingFiles] = reactExports.useState(/* @__PURE__ */ new Set());
  const fetchGraph = reactExports.useCallback(() => {
    window.api.getWorkspaceGraph({ workspacePath }).then((data) => {
      setGraphData(data);
      setLoading(false);
    }).catch((err) => {
      setError(String(err));
      setLoading(false);
    });
  }, [workspacePath]);
  reactExports.useEffect(() => {
    setLoading(true);
    setError(null);
    fetchGraph();
  }, [fetchGraph]);
  reactExports.useEffect(() => {
    let timeout;
    const unsub = window.api.onFsChanged(() => {
      clearTimeout(timeout);
      timeout = setTimeout(fetchGraph, 16);
    });
    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, [fetchGraph]);
  reactExports.useEffect(() => {
    replay.start(workspacePath);
    return () => replay.stop();
  }, [workspacePath]);
  reactExports.useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;
      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  const prevHiddenRef = reactExports.useRef(hidden);
  reactExports.useEffect(() => {
    const wasHidden = prevHiddenRef.current;
    prevHiddenRef.current = hidden;
    if (wasHidden && !hidden) {
      graphRef.current?.resetView();
    }
  }, [hidden]);
  reactExports.useEffect(() => {
    return window.api.onAgentEvent((event) => {
      setAgentSessions((prev) => {
        const next = new Map(prev);
        if (event.kind === "session-started") {
          next.set(event.sessionId, { interactions: [] });
        } else if (event.kind === "file-touched" && event.filePath && event.touchType && event.timestamp) {
          const session = next.get(event.sessionId);
          if (session) {
            session.interactions = [
              ...session.interactions,
              {
                filePath: event.filePath,
                touchType: event.touchType,
                timestamp: event.timestamp
              }
            ];
          }
        } else if (event.kind === "session-ended") {
          next.delete(event.sessionId);
        }
        return next;
      });
    });
  }, []);
  reactExports.useEffect(() => {
    if (agentSessions.size === 0) return;
    const interval = setInterval(() => setTick((t) => t + 1), 1e3);
    return () => clearInterval(interval);
  }, [agentSessions.size]);
  const mergedData = reactExports.useMemo(() => {
    if (!graphData) return null;
    const agentNodes = [];
    const agentLinks = [];
    const fileNodeIds = new Set(graphData.nodes.map((n) => n.id));
    for (const [sessionId, session] of agentSessions) {
      agentNodes.push({
        id: `agent:${sessionId}`,
        title: "Claude Code",
        path: "",
        weight: session.interactions.length,
        nodeType: "agent"
      });
      const seenFiles = /* @__PURE__ */ new Map();
      for (const interaction of session.interactions) {
        const existing = seenFiles.get(interaction.filePath);
        if (!existing || interaction.timestamp > existing.timestamp) {
          seenFiles.set(interaction.filePath, interaction);
        }
      }
      for (const [filePath, { touchType, timestamp }] of seenFiles) {
        if (!fileNodeIds.has(filePath)) continue;
        agentLinks.push({
          source: `agent:${sessionId}`,
          target: filePath,
          linkType: touchType === "read" ? "agent-read" : "agent-write",
          timestamp
        });
      }
    }
    return {
      nodes: [...graphData.nodes, ...agentNodes],
      links: [...graphData.links, ...agentLinks]
    };
  }, [graphData, agentSessions]);
  const scopedData = reactExports.useMemo(() => {
    if (!mergedData) return null;
    if (!scopePath) return mergedData;
    const relativePrefix = scopePath.startsWith(workspacePath) ? scopePath.slice(workspacePath.length).replace(/^\//, "") : scopePath;
    if (!relativePrefix) return mergedData;
    const prefix = relativePrefix.endsWith("/") ? relativePrefix : relativePrefix + "/";
    const scopedNodes = mergedData.nodes.filter(
      (n) => n.nodeType === "agent" || n.id.startsWith(prefix) || n.id === relativePrefix
    );
    const nodeIds = new Set(scopedNodes.map((n) => n.id));
    const scopedLinks = mergedData.links.filter(
      (l) => {
        const src = typeof l.source === "string" ? l.source : l.source.id;
        const tgt = typeof l.target === "string" ? l.target : l.target.id;
        return nodeIds.has(src) && nodeIds.has(tgt);
      }
    );
    const linkedAgentIds = /* @__PURE__ */ new Set();
    for (const l of scopedLinks) {
      const src = typeof l.source === "string" ? l.source : l.source.id;
      const tgt = typeof l.target === "string" ? l.target : l.target.id;
      if (src.startsWith("agent:")) linkedAgentIds.add(src);
      if (tgt.startsWith("agent:")) linkedAgentIds.add(tgt);
    }
    const finalNodes = scopedNodes.filter(
      (n) => n.nodeType !== "agent" || linkedAgentIds.has(n.id)
    );
    const finalNodeIds = new Set(finalNodes.map((n) => n.id));
    const finalLinks = scopedLinks.filter((l) => {
      const src = typeof l.source === "string" ? l.source : l.source.id;
      const tgt = typeof l.target === "string" ? l.target : l.target.id;
      return finalNodeIds.has(src) && finalNodeIds.has(tgt);
    });
    return { nodes: finalNodes, links: finalLinks };
  }, [mergedData, scopePath, workspacePath]);
  const [thumbnailData, setThumbnailData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!scopedData) {
      setThumbnailData(null);
      return;
    }
    setThumbnailData(scopedData);
    const imageNodes = scopedData.nodes.filter(
      (n) => n.path && isImageFile(n.path)
    );
    if (imageNodes.length === 0) return;
    let cancelled = false;
    Promise.all(
      imageNodes.map(async (node) => {
        try {
          const url = await window.api.getImageThumbnail(
            node.path,
            192
          );
          return { id: node.id, url };
        } catch {
          return null;
        }
      })
    ).then((results) => {
      if (cancelled) return;
      const urlMap = /* @__PURE__ */ new Map();
      for (const r of results) {
        if (r) urlMap.set(r.id, r.url);
      }
      if (urlMap.size === 0) return;
      setThumbnailData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          nodes: prev.nodes.map((n) => {
            const url = urlMap.get(n.id);
            return url ? { ...n, thumbnailUrl: url } : n;
          })
        };
      });
    });
    return () => {
      cancelled = true;
    };
  }, [scopedData]);
  const isLive = replay.currentIndex === -1;
  const liveData = thumbnailData ?? scopedData;
  const displayData = isLive ? liveData : replay.currentGraphData;
  const hueMap = reactExports.useMemo(
    () => displayData ? buildHueMap(displayData.nodes.map((n) => n.id)) : /* @__PURE__ */ new Map(),
    [displayData]
  );
  const isDark = theme === "dark";
  reactExports.useEffect(() => {
    if (replay.currentIndex < 0 || replay.modifiedFiles.size === 0) {
      setPulsingFiles(/* @__PURE__ */ new Set());
      return;
    }
    setPulsingFiles(new Set(replay.modifiedFiles));
    const timer = setTimeout(() => setPulsingFiles(/* @__PURE__ */ new Set()), 300);
    return () => clearTimeout(timer);
  }, [replay.currentIndex, replay.modifiedFiles]);
  const nodeFill = reactExports.useCallback(
    (node) => {
      if (pulsingFiles.has(node.id)) {
        return isDark ? "#ffffff" : "#000000";
      }
      if (node.nodeType === "agent") return "#E8714A";
      if (node.nodeType === "code") return isDark ? "#3b82f6" : "#1e3a8a";
      const hue = hueMap.get(node.id) ?? -1;
      return hueToColor(hue, isDark);
    },
    [hueMap, isDark, pulsingFiles]
  );
  const nodeStroke = reactExports.useCallback(
    (node) => {
      if (node.nodeType === "agent") {
        return isDark ? "#ffffff" : "#000000";
      }
      if (isImageFile(node.path)) {
        return isDark ? "#ffffff99" : "#00000099";
      }
      return isDark ? "#0f172a" : "#ffffff";
    },
    [isDark]
  );
  const nodeStrokeWidthFn = reactExports.useCallback(
    (node) => {
      if (node.nodeType === "agent") return 6;
      return 2;
    },
    []
  );
  const linkStroke = reactExports.useCallback(
    (link) => {
      if (link.linkType === "agent-read" || link.linkType === "agent-write") {
        return isDark ? "#ffffff" : "#000000";
      }
      if (link.linkType === "import") {
        return isDark ? "#3b82f6" : "#1e3a8a";
      }
      return isDark ? "#64748b" : "#94a3b8";
    },
    [isDark]
  );
  const linkOpacity = reactExports.useCallback(
    (link) => {
      if (link.linkType === "agent-read") return 0.5;
      if (link.linkType === "agent-write") return 0.7;
      return 0.5;
    },
    []
  );
  const weightRange = reactExports.useMemo(() => {
    if (!graphData) return { min: 0, max: 1 };
    let min = Infinity;
    let max = 0;
    for (const node of graphData.nodes) {
      const w = node.weight ?? 0;
      if (w < min) min = w;
      if (w > max) max = w;
    }
    if (!isFinite(min)) min = 0;
    if (max <= min) max = min + 1;
    return { min, max };
  }, [graphData]);
  const nodeRadius = reactExports.useCallback(
    (node) => {
      if (node.nodeType === "agent") return 16;
      if (isImageFile(node.path)) return 24;
      const w = node.weight ?? 0;
      const t = Math.max(0, Math.min(1, (w - weightRange.min) / (weightRange.max - weightRange.min)));
      return 10 + Math.pow(t, 1 / 2) * 16;
    },
    [weightRange]
  );
  const handleNodeClick = reactExports.useCallback(
    (node) => {
      if (node.nodeType === "agent") {
        const sessionId = node.id.replace("agent:", "");
        window.api.focusAgentSession(sessionId);
        return;
      }
      onSelectFile(node.path);
    },
    [onSelectFile]
  );
  reactExports.useEffect(() => {
    if (agentSessions.size === 0) return;
    graphRef.current?.refreshLinkStyles();
  }, [agentSessions]);
  const atGitRoot = !scopePath || scopePath === workspacePath;
  const timelineElement = !replay.isGitRepo || !atGitRoot ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(
    ReplayTimeline,
    {
      commits: replay.commits,
      currentIndex: replay.currentIndex,
      isPlaying: replay.isPlaying,
      isLoading: replay.isLoading,
      totalCommits: replay.totalCommits,
      timeRange: replay.timeRange,
      onPlay: replay.play,
      onPause: replay.pause,
      onSeekTo: replay.seekTo,
      onSeekToLive: replay.seekToLive
    }
  );
  const hasData = !loading && displayData && displayData.nodes.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "workspace-graph-container", ref: containerRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workspace-graph-canvas", ref: canvasRef, children: [
    !hasData && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "workspace-graph-status", children: "No files found in workspace" }),
    hasData && dimensions.width > 0 && dimensions.height > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ForceDirectedGraph,
      {
        ref: graphRef,
        data: displayData,
        width: dimensions.width,
        height: dimensions.height,
        darkMode: isDark,
        nodeFill,
        nodeStroke,
        nodeStrokeWidth: nodeStrokeWidthFn,
        nodeRadius,
        linkStroke,
        linkOpacity,
        onNodeClick: handleNodeClick
      }
    ),
    timelineElement
  ] }) });
}
function App() {
  const [params] = reactExports.useState(() => {
    const p = new URLSearchParams(window.location.search);
    return {
      folderPath: p.get("folder") ?? "",
      workspacePath: p.get("workspace") ?? ""
    };
  });
  const [theme, setTheme] = reactExports.useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [scopePath, setScopePath] = reactExports.useState(params.folderPath);
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  reactExports.useEffect(() => {
    if (typeof window.api.onScopeChanged !== "function") return;
    return window.api.onScopeChanged((newPath) => {
      setScopePath(newPath);
    });
  }, []);
  if (!params.workspacePath) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "var(--muted-foreground)", padding: 16 }, children: "No workspace" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WorkspaceGraph,
    {
      workspacePath: params.workspacePath,
      scopePath,
      theme,
      onSelectFile: (path) => window.api.selectFile(path)
    }
  );
}
initDarkMode();
const root = document.getElementById("root");
if (root) {
  clientExports.createRoot(root).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
}
