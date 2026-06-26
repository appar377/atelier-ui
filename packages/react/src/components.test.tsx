import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import {
  ArticleCard,
  Callout,
  Box,
  Button,
  Card,
  CodeBlockShell,
  CommandPalette,
  DataTable,
  SearchBox,
  SegmentedControl,
  Stack,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './index'

describe('component rendering', () => {
  it('renders layout classes from token props', () => {
    const html = renderToStaticMarkup(
      <Stack gap={4}>
        <Box padding={3} surface="raised">
          Content
        </Box>
      </Stack>,
    )
    expect(html).toContain('au-stack')
    expect(html).toContain('au-gap-4')
    expect(html).toContain('au-p-3')
    expect(html).toContain('au-surface-raised')
  })

  it('renders primitive class and data state attributes', () => {
    const button = renderToStaticMarkup(<Button intent="danger" loading>Delete</Button>)
    expect(button).toContain('au-btn--danger')
    expect(button).toContain('data-loading="true"')

    const toggle = renderToStaticMarkup(<Switch label="Enabled" defaultChecked />)
    expect(toggle).toContain('role="switch"')
    expect(toggle).toContain('data-state="checked"')
  })

  it('renders surface and navigation components', () => {
    const html = renderToStaticMarkup(
      <>
        <Card variant="soft">Card</Card>
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Panel</TabsContent>
        </Tabs>
        <SegmentedControl
          value="a"
          items={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
        />
      </>,
    )
    expect(html).toContain('au-card--soft')
    expect(html).toContain('au-tabs')
    expect(html).toContain('au-segmented')
    expect(html).toContain('data-selected="true"')
  })

  it('renders a data table from row data without sorting or filtering', () => {
    const html = renderToStaticMarkup(
      <DataTable
        columns={[{ key: 'name', header: 'Name', cell: (row: { name: string }) => row.name }]}
        rows={[{ name: 'Atelier' }]}
      />,
    )
    expect(html).toContain('au-data-table')
    expect(html).toContain('Atelier')
  })

  it('renders Knowledge Library v2 components as server-friendly markup', () => {
    const html = renderToStaticMarkup(
      <>
        <ArticleCard title="Readable prose" href="/articles/prose" category="Design" tags={['tokens']} />
        <SearchBox action="/search" defaultValue="tokens" />
        <Callout variant="tip" title="Tip">
          Keep logic in the app layer.
        </Callout>
        <CodeBlockShell filename="page.tsx" language="tsx">
          {'<ArticleCard title="Example" />'}
        </CodeBlockShell>
        <CommandPalette items={[{ id: 'open', label: 'Open article', href: '/articles/prose' }]} />
      </>,
    )
    expect(html).toContain('au-article-card')
    expect(html).toContain('au-search-box')
    expect(html).toContain('au-callout--tip')
    expect(html).toContain('au-code-shell')
    expect(html).toContain('au-command-palette')
  })
})
