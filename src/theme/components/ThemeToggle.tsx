import { Trans } from '@lingui/macro'
import Row from 'components/Row'
import { atom, useAtom } from 'jotai'
import { atomWithStorage, useUpdateAtom } from 'jotai/utils'
import ms from 'ms.macro'
import { useCallback, useEffect, useMemo } from 'react'
import { Moon, Sun } from 'react-feather'

import { Segment, SegmentedControl } from './SegmentedControl'
import { ThemedText } from './text'

const THEME_UPDATE_DELAY = ms`0.1s`
const DARKMODE_MEDIA_QUERY = window.matchMedia('(prefers-color-scheme: dark)')

export enum ThemeMode {
  LIGHT,
  DARK,
  AUTO,
}

// Tracks the device theme
const systemThemeAtom = atom<ThemeMode.LIGHT | ThemeMode.DARK>(
  DARKMODE_MEDIA_QUERY.matches ? ThemeMode.DARK : ThemeMode.LIGHT
)

// Tracks the user's selected theme mode
const themeModeAtom = atomWithStorage<ThemeMode>('interface_color_theme', ThemeMode.AUTO)

export function SystemThemeUpdater() {
  const setSystemTheme = useUpdateAtom(systemThemeAtom)

  useEffect(() => {
    DARKMODE_MEDIA_QUERY.addEventListener('change', (event) => {
      setSystemTheme(event.matches ? ThemeMode.DARK : ThemeMode.LIGHT)
    })
  }, [setSystemTheme])

  return null
}

export function useIsDarkMode(): boolean {
  return true
}

export function useDarkModeManager(): [boolean, (mode: ThemeMode) => void] {
  const isDarkMode = useIsDarkMode()
  const setMode = useUpdateAtom(themeModeAtom)

  return useMemo(() => {
    return [isDarkMode, setMode]
  }, [isDarkMode, setMode])
}

export default function ThemeToggle({ disabled }: { disabled?: boolean }) {
  const [mode, setMode] = useAtom(themeModeAtom)
  const switchMode = useCallback(
    (mode: ThemeMode) => {
      // Switch feels less jittery with short delay
      !disabled && setTimeout(() => setMode(mode), THEME_UPDATE_DELAY)
    },
    [disabled, setMode]
  )

  return (
    <Row align="center">
      <Row width="40%">
        <ThemedText.SubHeaderSmall color="primary">
          <Trans>Theme</Trans>
        </ThemedText.SubHeaderSmall>
      </Row>
      <Row flexGrow={1} justify="flex-end" width="60%">
        <SegmentedControl selected={mode} onSelect={switchMode}>
          <Segment value={ThemeMode.AUTO} testId="theme-auto">
            <Trans>Auto</Trans>
          </Segment>
          <Segment value={ThemeMode.LIGHT} Icon={Sun} testId="theme-lightmode" />
          <Segment value={ThemeMode.DARK} Icon={Moon} testId="theme-darkmode" />
        </SegmentedControl>
      </Row>
    </Row>
  )
}
