import { useEffect, useRef } from 'react'

const UPPER_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+='
const LOWER_GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+='
const DIGIT_GLYPHS = '0123456789'

// Characters that should remain fixed to maintain word structure and layout stability
const PRESERVED_CHARS = new Set([
  ' ', '\t', '\n', '\r',
  '/', '·', ':', '[', ']', '-', '+', '&', '(', ')',
  ',', '.', '—', '–', '"', "'", '“', '”', '’', '‘',
  '→', '←', '↗', '↘', '|', '\\', '@', '#', '%', '©', '®', '™'
])

function getRandomGlyphFor(char) {
  if (char >= 'A' && char <= 'Z') {
    return UPPER_GLYPHS[Math.floor(Math.random() * UPPER_GLYPHS.length)]
  }
  if (char >= 'a' && char <= 'z') {
    return LOWER_GLYPHS[Math.floor(Math.random() * LOWER_GLYPHS.length)]
  }
  if (char >= '0' && char <= '9') {
    return DIGIT_GLYPHS[Math.floor(Math.random() * DIGIT_GLYPHS.length)]
  }
  return UPPER_GLYPHS[Math.floor(Math.random() * UPPER_GLYPHS.length)]
}

// Ultra-smooth quartic ease-out for extended, natural organic deceleration
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

/**
 * usePageTransitionScramble Hook:
 * Ultra-smooth, natural, lightweight text scramble on page transitions.
 *
 * Performance fixes applied:
 * 1. Viewport-only targeting: Only scrambles text nodes currently visible on screen.
 *    Nodes thousands of pixels down the page are NOT touched, eliminating layout thrashing.
 * 2. Capped node count: Targets the top ~35 prominent visible nodes (headings, subtitles, badges, tags).
 * 3. Throttled glyph morphing: Glyphs shift at a natural ~26Hz cadence instead of noisy 120Hz strobe.
 * 4. Zero redundant writes: Avoids mutating nodeValue once characters have locked into place.
 * 5. Extended duration (~1850ms) for a luxurious, fluid architectural decoding effect.
 */
export function usePageTransitionScramble(pageKey, targetSection = null, delayMs = 0) {
  const prevKeyRef = useRef(null)
  const animRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Unique transition identifier (e.g. 'home:projects', 'home:home', 'project:compify', 'resume:default')
    const currentKey = `${pageKey}:${pageKey === 'home' ? (targetSection || 'home') : 'default'}`
    const isPageChange = prevKeyRef.current !== null && prevKeyRef.current !== currentKey
    const isInitialMount = prevKeyRef.current === null
    prevKeyRef.current = currentKey

    if (!isPageChange && !isInitialMount) return

    // Cancel any previous in-flight scramble animation
    if (animRef.current) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    let textNodesData = []

    const startScramble = () => {
      // If landing on Home, scramble ONLY the targeted section container (e.g. #projects or #home or #skills)
      let container = null
      if (pageKey === 'home') {
        const sectionId = targetSection || 'home'
        container = document.getElementById(sectionId) || document.getElementById('home')
      } else {
        container = document.getElementById('main-content')
      }

      if (!container) return

      const vpHeight = window.innerHeight
      const vpWidth = window.innerWidth

      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) {
              return NodeFilter.FILTER_REJECT
            }
            const parent = node.parentElement
            if (!parent) return NodeFilter.FILTER_REJECT

            // Skip elements explicitly marked to ignore page-level scramble
            if (parent.closest('[data-no-page-scramble]')) {
              return NodeFilter.FILTER_REJECT
            }

            // Skip technical tags and hidden / running marquee elements
            const tag = parent.tagName
            if (
              tag === 'SCRIPT' ||
              tag === 'STYLE' ||
              tag === 'NOSCRIPT' ||
              tag === 'SVG' ||
              parent.closest('svg') ||
              parent.closest('.sr-only') ||
              parent.closest('.marquee') ||
              parent.closest('[class*="marquee"]')
            ) {
              return NodeFilter.FILTER_REJECT
            }

            // PERFORMANCE CRITICAL: Check bounding box!
            // Only accept elements currently inside or very near the viewport.
            // Elements below the fold (e.g. 1000px-6000px down) are completely skipped.
            const rect = parent.getBoundingClientRect()
            if (rect.width === 0 || rect.height === 0) {
              return NodeFilter.FILTER_REJECT
            }
            if (rect.bottom < -20 || rect.top > vpHeight + 60 || rect.right < 0 || rect.left > vpWidth) {
              return NodeFilter.FILTER_REJECT
            }

            return NodeFilter.FILTER_ACCEPT
          },
        }
      )

      let current
      const MAX_NODES = 35 // Optimal limit: comprehensive visual coverage, zero lag
      while ((current = walker.nextNode()) && textNodesData.length < MAX_NODES) {
        const originalText = current.nodeValue
        const len = originalText.length
        if (len === 0) continue

        const offsets = new Float32Array(len)
        for (let i = 0; i < len; i++) {
          offsets[i] = (Math.random() - 0.5) * 0.08
        }

        textNodesData.push({
          node: current,
          originalText,
          len,
          offsets,
          currentGlyphs: new Array(len),
          renderedText: originalText,
        })
      }

      if (textNodesData.length === 0) return

      // Extended duration (~1850ms) for a silky, natural, cinematic resolution wave
      const DURATION_MS = 1850
      const startTime = performance.now()
      let lastGlyphTick = 0
      const GLYPH_INTERVAL_MS = 38 // ~26Hz glyph cadence: natural and readable

      const step = (now) => {
        const elapsed = now - startTime
        const rawProgress = Math.min(1, elapsed / DURATION_MS)
        const progress = easeOutQuart(rawProgress)

        // Animation finished: restore exact original text strings
        if (rawProgress >= 1) {
          for (let i = 0; i < textNodesData.length; i++) {
            const item = textNodesData[i]
            if (item.node && item.node.isConnected) {
              if (item.renderedText !== item.originalText) {
                item.node.nodeValue = item.originalText
                item.renderedText = item.originalText
              }
            }
          }
          animRef.current = null
          return
        }

        const shouldMorphGlyphs = now - lastGlyphTick >= GLYPH_INTERVAL_MS
        if (shouldMorphGlyphs) {
          lastGlyphTick = now
        }

        // Full smooth lock-in wave across the targeted viewport text nodes
        for (let idx = 0; idx < textNodesData.length; idx++) {
          const item = textNodesData[idx]
          if (!item.node || !item.node.isConnected) continue

          const { originalText, len, offsets, currentGlyphs } = item
          let result = ''

          for (let i = 0; i < len; i++) {
            const char = originalText[i]

            // Always preserve spaces and structural punctuation
            if (PRESERVED_CHARS.has(char)) {
              result += char
              continue
            }

            // Extended left-to-right staggered wave with organic per-character variance
            const baseRatio = len <= 1 ? 0.5 : i / (len - 1)
            const charThreshold = Math.max(0.15, Math.min(0.94, 0.2 + baseRatio * 0.68 + offsets[i]))

            if (progress >= charThreshold) {
              // Character is locked into original text
              result += char
            } else {
              // Character is in scrambled state:
              if (shouldMorphGlyphs || !currentGlyphs[i]) {
                if (!currentGlyphs[i] || Math.random() < 0.28) {
                  currentGlyphs[i] = getRandomGlyphFor(char)
                }
              }
              result += currentGlyphs[i] || getRandomGlyphFor(char)
            }
          }

          // Zero redundant DOM writes: only update nodeValue when text actually changed
          if (result !== item.renderedText) {
            item.node.nodeValue = result
            item.renderedText = result
          }
        }

        animRef.current = requestAnimationFrame(step)
      }

      animRef.current = requestAnimationFrame(step)
    }

    if (delayMs > 0) {
      timeoutRef.current = setTimeout(() => {
        startScramble()
      }, delayMs)
    } else {
      // Wait 1 frame for newly mounted page elements to render in the DOM
      timeoutRef.current = setTimeout(() => {
        requestAnimationFrame(startScramble)
      }, 30)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
      for (let i = 0; i < textNodesData.length; i++) {
        const item = textNodesData[i]
        if (item.node && item.node.isConnected) {
          item.node.nodeValue = item.originalText
        }
      }
    }
  }, [pageKey, targetSection, delayMs])
}
