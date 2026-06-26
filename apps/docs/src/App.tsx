import * as React from 'react'
import {
  Alert,
  ArticleCard,
  ArticleHeader,
  ArticleMeta,
  AtelierProvider,
  Avatar,
  BacklinkList,
  Badge,
  BeanTag,
  BottomNavigation,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  Callout,
  CategoryPill,
  CoffeeBlendCard,
  CoffeeRatioSlider,
  CodeBlockShell,
  CommandPalette,
  ConfirmDialog,
  Container,
  DataTable,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Divider,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  EmptyState,
  ErrorState,
  GameButton,
  GamePanel,
  Grid,
  IconButton,
  Inline,
  Input,
  InventorySlot,
  KnowledgeCard,
  List,
  ListItem,
  LoadingState,
  MarkdownView,
  Navbar,
  Pagination,
  Panel,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  QuestCard,
  Radio,
  RelatedArticleList,
  SearchBox,
  Section,
  SegmentedControl,
  Select,
  SeriesNav,
  Sidebar,
  Skeleton,
  Slider,
  Spacer,
  Spinner,
  Stack,
  StatCard,
  Switch,
  Table,
  TableOfContents,
  TagPill,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThumbnailFrame,
  Timeline,
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  WikiLink,
} from '@appar/atelier-react'
import type { AtelierDensity, AtelierFontPreset, AtelierRadius, AtelierTheme } from '@appar/atelier-react'

const themeItems = [
  { label: 'Neutral', value: 'neutral' },
  { label: 'Warm', value: 'warm' },
  { label: 'Cafe', value: 'cafe' },
  { label: 'Forest', value: 'forest' },
  { label: 'Ocean', value: 'ocean' },
  { label: 'Mono', value: 'mono' },
  { label: 'Play', value: 'play' },
  { label: 'Dark', value: 'dark' },
]

const densityItems = [
  { label: 'Compact', value: 'compact' },
  { label: 'Comfortable', value: 'comfortable' },
  { label: 'Spacious', value: 'spacious' },
]

const radiusItems = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Full', value: 'full' },
]

const fontItems = [
  { label: 'Sans', value: 'sans' },
  { label: 'Serif', value: 'serif' },
  { label: 'Mono', value: 'mono' },
  { label: 'Rounded', value: 'rounded' },
]

const tableRows = [
  { name: 'Tokens', status: 'Ready', owner: 'Core' },
  { name: 'CSS', status: 'Ready', owner: 'Rails' },
  { name: 'React', status: 'Active', owner: 'Apps' },
]

const articleMeta = [
  { label: 'Published', value: 'Jun 26, 2026' },
  { label: 'Reading time', value: '8 min read' },
  { label: 'Updated', value: 'v2' },
]

const tocItems = [
  { title: 'Token strategy', href: '#token-strategy', depth: 1 as const },
  { title: 'Server component API', href: '#server-component-api', depth: 2 as const },
  { title: 'Prose and code', href: '#prose-and-code', depth: 2 as const },
  { title: 'Knowledge graph links', href: '#knowledge-graph-links', depth: 1 as const },
]

const relatedArticles = [
  {
    id: 'r1',
    title: 'Design tokens for readable prose',
    href: '#',
    excerpt: 'A quiet typographic scale for long technical pages.',
    meta: [{ value: '5 min' }],
  },
  {
    id: 'r2',
    title: 'Building App Router friendly UI',
    href: '#',
    excerpt: 'Keep data fetching and behavior outside presentational components.',
    meta: [{ value: '7 min' }],
  },
]

const commandItems = [
  { id: 'new-note', label: 'Create note', description: 'Start a new knowledge entry', category: 'Notes', shortcut: 'N', href: '#' },
  { id: 'search-symbols', label: 'Search symbols', description: 'Jump to API references', category: 'Code', shortcut: 'S', href: '#' },
  { id: 'open-backlinks', label: 'Open backlinks', description: 'Review related writing', category: 'Graph', shortcut: 'B', href: '#' },
]

export function App() {
  const [theme, setTheme] = React.useState<AtelierTheme>('neutral')
  const [density, setDensity] = React.useState<AtelierDensity>('comfortable')
  const [radius, setRadius] = React.useState<AtelierRadius>('md')
  const [fontPreset, setFontPreset] = React.useState<AtelierFontPreset>('sans')
  const [toastOpen, setToastOpen] = React.useState(false)

  return (
    <AtelierProvider theme={theme} density={density} radius={radius} fontPreset={fontPreset} className="docs-shell">
      <TooltipProvider>
        <ToastProvider>
          <Section paddingY={8}>
            <Container size="xl">
              <Stack gap={6}>
                <Navbar>
                  <div>
                    <p className="docs-kicker">Quiet Atelier UI</p>
                    <h1>atelier-ui</h1>
                  </div>
                  <Inline gap={2}>
                    <Badge intent="success">v2 gallery</Badge>
                    <Avatar name="Atelier UI" />
                  </Inline>
                </Navbar>

                <Grid columns={4} gap={3}>
                  <Select label="Theme" value={theme} items={themeItems} onValueChange={(value) => setTheme(value as AtelierTheme)} />
                  <Select
                    label="Density"
                    value={density}
                    items={densityItems}
                    onValueChange={(value) => setDensity(value as AtelierDensity)}
                  />
                  <Select label="Radius" value={radius} items={radiusItems} onValueChange={(value) => setRadius(value as AtelierRadius)} />
                  <Select
                    label="Font"
                    value={fontPreset}
                    items={fontItems}
                    onValueChange={(value) => setFontPreset(value as AtelierFontPreset)}
                  />
                </Grid>

                <Tabs defaultValue="foundation" variant="segment">
                  <TabsList>
                    <TabsTrigger value="foundation">Foundation</TabsTrigger>
                    <TabsTrigger value="surface">Surface</TabsTrigger>
                    <TabsTrigger value="navigation">Navigation</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    <TabsTrigger value="apps">Apps</TabsTrigger>
                    <TabsTrigger value="knowledge-v2">Knowledge v2</TabsTrigger>
                  </TabsList>

                  <TabsContent value="foundation">
                    <Grid columns={3} gap={4}>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Actions</h2>
                          <Inline gap={2}>
                            <Button>Save</Button>
                            <Button variant="outline" intent="neutral">
                              Cancel
                            </Button>
                            <Button variant="soft" intent="danger">
                              Delete
                            </Button>
                            <Button loading>Saving</Button>
                            <IconButton icon={<span aria-hidden="true">?</span>} aria-label="Help" variant="ghost" intent="neutral" />
                          </Inline>
                          <Inline gap={2}>
                            <Badge intent="success">Success</Badge>
                            <Badge intent="warning" variant="outline">
                              Warning
                            </Badge>
                            <Badge intent="danger" variant="dot">
                              Danger
                            </Badge>
                            <Chip intent="primary" selected>
                              Token based
                            </Chip>
                          </Inline>
                        </Stack>
                      </Panel>

                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Forms</h2>
                          <Input label="Name" placeholder="Atelier" description="Label, hint, and error patterns." />
                          <Select
                            label="Use case"
                            placeholder="Select one"
                            items={[
                              { label: 'Wiki', value: 'wiki' },
                              { label: 'Coffee Blender', value: 'coffee' },
                              { label: 'Dashboard', value: 'dashboard' },
                            ]}
                          />
                          <Textarea label="Note" placeholder="Short note" minRows={3} />
                          <Checkbox label="Keyboard accessible" defaultChecked />
                          <Radio label="Native radio" name="preview-radio" defaultChecked />
                          <Switch label="Theme attributes" defaultChecked />
                          <Slider label="Density scale" min={0} max={100} defaultValue={64} showValue />
                        </Stack>
                      </Panel>

                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Layout</h2>
                          <Box padding={3} surface="surface" border radius="md">
                            Box
                          </Box>
                          <Inline gap={2}>
                            <Box padding={2} surface="soft" radius="md">
                              Inline
                            </Box>
                            <Box padding={2} surface="soft" radius="md">
                              Gap
                            </Box>
                          </Inline>
                          <Spacer size={4} />
                          <Divider />
                          <Grid columns={2} gap={2}>
                            <Box padding={2} surface="raised" border radius="md">
                              Grid
                            </Box>
                            <Box padding={2} surface="raised" border radius="md">
                              Cell
                            </Box>
                          </Grid>
                        </Stack>
                      </Panel>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="surface">
                    <Grid columns={3} gap={4}>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Surfaces</h2>
                          <Card variant="soft">Card soft</Card>
                          <Panel variant="outline" className="docs-inner-panel">
                            Panel outline
                          </Panel>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">Open dialog</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Dialog title</DialogTitle>
                                <DialogDescription>Focus, escape, and aria behavior come from Radix.</DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button>Done</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </Stack>
                      </Panel>

                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Floating</h2>
                          <Drawer>
                            <DrawerTrigger asChild>
                              <Button variant="soft">Open drawer</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                              <Stack gap={3}>
                                <DrawerTitle>Drawer</DrawerTitle>
                                <DrawerDescription>Side panel for app shell workflows.</DrawerDescription>
                                <DrawerClose asChild>
                                  <Button>Close drawer</Button>
                                </DrawerClose>
                              </Stack>
                            </DrawerContent>
                          </Drawer>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline">Open popover</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <Stack gap={2}>
                                <strong>Popover</strong>
                                <span>Floating content without app logic.</span>
                              </Stack>
                            </PopoverContent>
                          </Popover>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" intent="neutral">
                                Hover target
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Tooltip content</TooltipContent>
                          </Tooltip>
                        </Stack>
                      </Panel>

                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Feedback basics</h2>
                          <Progress label="Build readiness" value={72} showValue />
                          <Spinner size="lg" />
                          <Skeleton />
                          <Skeleton variant="rect" radius="lg" />
                        </Stack>
                      </Panel>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="navigation">
                    <Grid columns={3} gap={4}>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Navigation</h2>
                          <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Library', href: '#' }, { label: 'Components' }]} />
                          <SegmentedControl
                            value="docs"
                            items={[
                              { label: 'Docs', value: 'docs' },
                              { label: 'Code', value: 'code' },
                              { label: 'Preview', value: 'preview' },
                            ]}
                          />
                          <Pagination page={2} pageCount={4} />
                        </Stack>
                      </Panel>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>App shell</h2>
                          <Sidebar>
                            <Button variant="ghost" intent="neutral">
                              Dashboard
                            </Button>
                            <Button variant="ghost" intent="neutral">
                              Notes
                            </Button>
                          </Sidebar>
                        </Stack>
                      </Panel>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Bottom nav</h2>
                          <BottomNavigation>
                            <Button variant="plain" intent="neutral">
                              Home
                            </Button>
                            <Button variant="plain" intent="neutral">
                              Search
                            </Button>
                            <Button variant="plain" intent="neutral">
                              Settings
                            </Button>
                          </BottomNavigation>
                        </Stack>
                      </Panel>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="data">
                    <Grid columns={3} gap={4}>
                      <Panel className="docs-panel docs-wide">
                        <Stack gap={4}>
                          <h2>Tables</h2>
                          <DataTable
                            rows={tableRows}
                            columns={[
                              { key: 'name', header: 'Name', cell: (row) => row.name },
                              { key: 'status', header: 'Status', cell: (row) => <Badge size="sm">{row.status}</Badge> },
                              { key: 'owner', header: 'Owner', cell: (row) => row.owner },
                            ]}
                          />
                          <Table size="sm">
                            <tbody>
                              <tr>
                                <td>Plain table</td>
                                <td>Semantic HTML</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Stack>
                      </Panel>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Lists</h2>
                          <List variant="surface">
                            <ListItem start={<Avatar name="AU" size="sm" />} end={<Badge size="sm">New</Badge>}>
                              List item
                            </ListItem>
                            <ListItem start={<Avatar name="QS" size="sm" />}>Second item</ListItem>
                          </List>
                          <StatCard label="Components" value="40+" description="Token-backed and composable" intent="primary" />
                        </Stack>
                      </Panel>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Timeline</h2>
                          <Timeline
                            items={[
                              { id: '1', title: 'Tokens', description: 'CSS variables and TS types', intent: 'success' },
                              { id: '2', title: 'Components', description: 'Thin React wrappers', intent: 'info' },
                            ]}
                          />
                          <EmptyState title="No records" description="Use action props from the app layer." />
                        </Stack>
                      </Panel>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="feedback">
                    <Grid columns={3} gap={4}>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Alerts</h2>
                          <Alert title="Info">Readable, calm status text.</Alert>
                          <Alert intent="warning" variant="outline" title="Warning">
                            Check before continuing.
                          </Alert>
                          <LoadingState />
                          <ErrorState action={<Button variant="outline">Retry</Button>}>Could not load the panel.</ErrorState>
                        </Stack>
                      </Panel>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Toast</h2>
                          <Button onClick={() => setToastOpen(true)}>Show toast</Button>
                          <Toast open={toastOpen} onOpenChange={setToastOpen} intent="success">
                            <ToastTitle>Saved</ToastTitle>
                            <ToastDescription>The gallery state was updated.</ToastDescription>
                          </Toast>
                        </Stack>
                      </Panel>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Confirm</h2>
                          <ConfirmDialog
                            trigger={
                              <Button variant="soft" intent="danger">
                                Delete item
                              </Button>
                            }
                            title="Delete item"
                            description="The app owns the actual delete logic."
                          />
                        </Stack>
                      </Panel>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="apps">
                    <Grid columns={3} gap={4}>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Knowledge</h2>
                          <MarkdownView>
                            <p>
                              Compose knowledge pages with <WikiLink href="#">WikiLink</WikiLink> and cards.
                            </p>
                          </MarkdownView>
                          <KnowledgeCard
                            title="Quiet design systems"
                            excerpt="Reusable UI for long-running personal tools."
                            tags={['wiki', 'design']}
                            backlinksCount={8}
                            updatedAt="Today"
                          />
                          <BacklinkList items={[{ id: 'a', title: 'Related note', href: '#', excerpt: 'A linked idea.' }]} />
                        </Stack>
                      </Panel>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Coffee</h2>
                          <CoffeeBlendCard
                            title="Morning blend"
                            beans={[
                              { name: 'Ethiopia', ratio: 60 },
                              { name: 'Brazil', ratio: 40 },
                            ]}
                            flavorNotes={['citrus', 'cacao']}
                          />
                          <CoffeeRatioSlider
                            beans={[
                              { name: 'Ethiopia', ratio: 60 },
                              { name: 'Brazil', ratio: 40 },
                            ]}
                          />
                          <Inline gap={2}>
                            <BeanTag roastLevel="light">Light</BeanTag>
                            <BeanTag roastLevel="dark">Dark</BeanTag>
                          </Inline>
                        </Stack>
                      </Panel>
                      <Panel className="docs-panel">
                        <Stack gap={4}>
                          <h2>Game</h2>
                          <GamePanel title="Inventory" variant="inventory" rarity="rare">
                            <Inline gap={2}>
                              <InventorySlot item="A" selected rarity="rare" />
                              <InventorySlot item="B" rarity="epic" />
                              <InventorySlot item="C" />
                            </Inline>
                          </GamePanel>
                          <GameButton rarity="legendary">Start quest</GameButton>
                          <QuestCard title="Find the archive" status="active" description="A display-only quest card." reward="120 XP" />
                        </Stack>
                      </Panel>
                    </Grid>
                  </TabsContent>

                  <TabsContent value="knowledge-v2">
                    <Grid columns={3} gap={4}>
                      <Panel className="docs-panel docs-wide">
                        <Stack gap={5}>
                          <Breadcrumbs items={[{ label: 'Library', href: '#' }, { label: 'Engineering', href: '#' }, { label: 'Tokens' }]} />
                          <ArticleHeader
                            eyebrow="Knowledge Library"
                            category="Engineering"
                            title="Design tokens for readable technical writing"
                            description="A quiet article surface for long-form notes, API references, and linked knowledge bases."
                            meta={articleMeta}
                            tags={['design-tokens', 'app-router', 'prose']}
                            actions={<Button variant="outline">Follow series</Button>}
                          />
                          <MarkdownView>
                            <p>
                              Technical articles need a calm reading rhythm, stable navigation, and low-friction links to related concepts.
                              The v2 set keeps app logic outside the UI layer while preserving a coherent editorial surface.
                            </p>
                            <Callout variant="tip" title="Server component friendly">
                              Components render from props and class names. Filtering, routing, syntax highlighting, and copy behavior stay in the app.
                            </Callout>
                            <h2 id="token-strategy">Token strategy</h2>
                            <p>
                              Content typography, code colors, callouts, thumbnails, and subtle surfaces are controlled by CSS variables.
                              The default accent is emerald, with category accents for product areas.
                            </p>
                            <CodeBlockShell filename="app/articles/page.tsx" language="tsx" action={<Button size="xs" variant="ghost">Copy</Button>}>
                              {'<ArticleCard title=\"Design tokens\" href=\"/articles/tokens\" />'}
                            </CodeBlockShell>
                          </MarkdownView>
                          <SeriesNav
                            previous={{ id: 'prev', title: 'Structuring a knowledge base', href: '#' }}
                            next={{ id: 'next', title: 'Code blocks without client state', href: '#' }}
                          />
                        </Stack>
                      </Panel>

                      <Stack gap={4}>
                        <Panel className="docs-panel">
                          <Stack gap={4}>
                            <h2>Find</h2>
                            <SearchBox action="#" placeholder="Search posts, tags, and backlinks" />
                            <Inline gap={2}>
                              <CategoryPill>Engineering</CategoryPill>
                              <CategoryPill accent="blue">Product</CategoryPill>
                              <TagPill>React</TagPill>
                              <TagPill>CSS</TagPill>
                            </Inline>
                          </Stack>
                        </Panel>
                        <TableOfContents items={tocItems} activeHref="#token-strategy" />
                        <RelatedArticleList items={relatedArticles} />
                      </Stack>

                      <Stack gap={4}>
                        <ArticleCard
                          variant="featured"
                          title="App Router data boundaries"
                          href="#"
                          category="Next.js"
                          accent="blue"
                          excerpt="Keep fetching in route segments and pass stable display data into the design system."
                          meta={[{ value: '12 min read' }, { value: 'Updated today' }]}
                          tags={['server-components', 'routing']}
                          thumbnail={
                            <ThumbnailFrame aspectRatio="square">
                              <span className="docs-thumbnail-mark">API</span>
                            </ThumbnailFrame>
                          }
                        />
                        <KnowledgeCard
                          title="Backlink-first writing"
                          excerpt="A note card for concepts that should stay connected across articles."
                          category="Notes"
                          accent="violet"
                          tags={['wiki', 'graph']}
                          backlinksCount={14}
                          updatedAt="Today"
                        />
                        <Panel className="docs-panel">
                          <Stack gap={3}>
                            <h2>Backlinks</h2>
                            <BacklinkList
                              items={[
                                { id: 'b1', title: 'Prose rhythm', href: '#', excerpt: 'Line height and heading spacing notes.' },
                                { id: 'b2', title: 'Code shell tokens', href: '#', excerpt: 'Dark code surfaces and copy actions.' },
                              ]}
                            />
                            <ArticleMeta items={[{ value: '2 backlinks' }, { value: '3 related tags' }]} />
                            <EmptyState title="No drafts" description="Drafts appear after the app supplies article data." />
                          </Stack>
                        </Panel>
                      </Stack>

                      <Box className="docs-knowledge-dark docs-wide" padding={4} data-au-theme="dark">
                        <Grid columns={2} gap={4}>
                          <CommandPalette
                            title="Knowledge command"
                            description="Jump across articles, notes, and symbols."
                            placeholder="Run a command"
                            items={commandItems}
                            footer="Static shell. Keyboard logic belongs to the app."
                          />
                          <Stack gap={4}>
                            <StatCard label="Articles" value="128" description="Indexed pages" intent="success" />
                            <Callout variant="important" title="Important">
                              Keep editorial components quiet, readable, and composable.
                            </Callout>
                            <ArticleCard
                              title="Dark mode reading surfaces"
                              href="#"
                              category="Design"
                              accent="emerald"
                              excerpt="Token-driven contrast for long reading sessions."
                              meta={[{ value: '6 min' }]}
                            />
                          </Stack>
                        </Grid>
                      </Box>
                    </Grid>
                  </TabsContent>
                </Tabs>
              </Stack>
            </Container>
          </Section>
          <ToastViewport />
        </ToastProvider>
      </TooltipProvider>
    </AtelierProvider>
  )
}
