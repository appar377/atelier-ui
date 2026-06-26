import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { AtelierPlacement } from '../core/types'
import { cx } from '../core/types'

/**
 * Props for Panel, a neutral framed surface for tools and dense content.
 */
export type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Visual treatment of the panel. */
  variant?: 'surface' | 'soft' | 'outline' | 'elevated'
}

/**
 * Neutral framed surface used for tool panels, side regions, and dense UI groups.
 */
export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { variant = 'surface', className, ...props },
  ref,
) {
  return <div ref={ref} className={cx('au-panel', `au-panel--${variant}`, className)} {...props} />
})

/**
 * Root component for modal dialogs.
 */
export const Dialog = DialogPrimitive.Root

/**
 * Button or element that opens a Dialog.
 */
export const DialogTrigger = DialogPrimitive.Trigger

/**
 * Closes the nearest Dialog.
 */
export const DialogClose = DialogPrimitive.Close

/**
 * Portal used by Dialog content and overlay.
 */
export const DialogPortal = DialogPrimitive.Portal

/**
 * Props for DialogContent.
 */
export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /** Width preset for the dialog content. */
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Modal dialog content with overlay, focus management, and keyboard behavior from Radix.
 */
export const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  function DialogContent({ size = 'md', className, children, ...props }, ref) {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="au-dialog__overlay" />
        <DialogPrimitive.Content ref={ref} className={cx('au-dialog__content', `au-dialog__content--${size}`, className)} {...props}>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    )
  },
)

/**
 * Header area for DialogContent.
 */
export const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function DialogHeader(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cx('au-dialog__header', className)} {...props} />
})

/**
 * Title for DialogContent. This wires into Radix dialog labeling.
 */
export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cx('au-dialog__title', className)} {...props} />
})

/**
 * Description for DialogContent. This wires into Radix dialog description.
 */
export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} className={cx('au-dialog__description', className)} {...props} />
})

/**
 * Footer area for Dialog actions.
 */
export const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function DialogFooter(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cx('au-dialog__footer', className)} {...props} />
})

/**
 * Root component for drawer panels. Uses Radix Dialog semantics.
 */
export const Drawer = DialogPrimitive.Root

/**
 * Element that opens a Drawer.
 */
export const DrawerTrigger = DialogPrimitive.Trigger

/**
 * Closes the nearest Drawer.
 */
export const DrawerClose = DialogPrimitive.Close

/**
 * Title for DrawerContent. This wires into Radix dialog labeling.
 */
export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DrawerTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cx('au-dialog__title', className)} {...props} />
})

/**
 * Description for DrawerContent. This wires into Radix dialog description.
 */
export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DrawerDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} className={cx('au-dialog__description', className)} {...props} />
})

/**
 * Props for DrawerContent.
 */
export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /** Side where the drawer appears. */
  side?: 'left' | 'right' | 'bottom'
}

/**
 * Drawer content rendered through Radix Dialog for focus management.
 */
export const DrawerContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DrawerContentProps>(
  function DrawerContent({ side = 'right', className, children, ...props }, ref) {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="au-dialog__overlay" />
        <DialogPrimitive.Content ref={ref} className={cx('au-drawer__content', `au-drawer__content--${side}`, className)} {...props}>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    )
  },
)

/**
 * Root component for popover disclosure UI.
 */
export const Popover = PopoverPrimitive.Root

/**
 * Element that opens a Popover.
 */
export const PopoverTrigger = PopoverPrimitive.Trigger

/**
 * Closes the nearest Popover.
 */
export const PopoverClose = PopoverPrimitive.Close

/**
 * Props for PopoverContent.
 */
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  /** Preferred side for floating content. */
  side?: AtelierPlacement
}

/**
 * Floating popover content with Radix positioning and dismissal behavior.
 */
export const PopoverContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  function PopoverContent({ side = 'bottom', sideOffset = 8, className, ...props }, ref) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          className={cx('au-popover__content', className)}
          {...props}
        />
      </PopoverPrimitive.Portal>
    )
  },
)

/**
 * Provider for tooltip timing configuration.
 */
export const TooltipProvider = TooltipPrimitive.Provider

/**
 * Root tooltip component.
 */
export const Tooltip = TooltipPrimitive.Root

/**
 * Element that anchors and opens a Tooltip.
 */
export const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * Props for TooltipContent.
 */
export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  /** Preferred side for the tooltip. */
  side?: AtelierPlacement
}

/**
 * Floating tooltip content with Radix positioning.
 */
export const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  function TooltipContent({ side = 'top', sideOffset = 6, className, ...props }, ref) {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          className={cx('au-tooltip__content', className)}
          {...props}
        />
      </TooltipPrimitive.Portal>
    )
  },
)
