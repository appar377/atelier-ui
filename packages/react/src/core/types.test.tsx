import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { cx, dataBoolean, spaceClass, spaceTokenClass, useControllableState } from './types'

function StateProbe({
  value,
  defaultValue,
  onChange,
}: {
  value?: string
  defaultValue: string
  onChange?: (value: string) => void
}) {
  const [currentValue] = useControllableState({ value, defaultValue, onChange })
  return <span data-value={currentValue} />
}

describe('core helpers', () => {
  it('joins class names and removes empty values', () => {
    expect(cx('a', false, undefined, 'b')).toBe('a b')
  })

  it('converts booleans to data attribute values', () => {
    expect(dataBoolean(true)).toBe('true')
    expect(dataBoolean(false)).toBeUndefined()
  })

  it('builds spacing class suffixes', () => {
    expect(spaceClass(0.5)).toBe('0-5')
    expect(spaceTokenClass('au-gap', 4)).toBe('au-gap-4')
  })

  it('supports controlled and uncontrolled initial values', () => {
    expect(renderToStaticMarkup(<StateProbe defaultValue="default" />)).toContain('data-value="default"')
    expect(renderToStaticMarkup(<StateProbe value="controlled" defaultValue="default" />)).toContain(
      'data-value="controlled"',
    )
  })
})
