import * as React from 'react'
import {
  Alert,
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
  CoffeeBlendCard,
  CoffeeRatioSlider,
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
  Section,
  SegmentedControl,
  Select,
  Sidebar,
  Skeleton,
  Slider,
  Spacer,
  Spinner,
  Stack,
  StatCard,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
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
                    <Badge intent="success">v1 gallery</Badge>
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
