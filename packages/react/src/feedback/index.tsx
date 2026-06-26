import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as ToastPrimitive from '@radix-ui/react-toast'
import type { AtelierIntent, AtelierSize } from '../core/types'
import { cx } from '../core/types'
import { Button } from '../primitives/button'
import { Spinner } from '../primitives/spinner'

/**
 * Props for Alert.
 */
export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Semantic alert intent. */
  intent?: AtelierIntent
  /** Visual treatment. */
  variant?: 'soft' | 'outline' | 'solid'
  /** Optional title. */
  title?: React.ReactNode
}

/**
 * Inline status message for success, warning, danger, info, or neutral feedback.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { intent = 'info', variant = 'soft', title, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-alert', `au-alert--${intent}`, `au-alert--${variant}`, className)} role="status" {...props}>
      {title ? <div className="au-alert__title">{title}</div> : null}
      {children ? <div className="au-alert__body">{children}</div> : null}
    </div>
  )
})

/**
 * Provider for Toast state and timing.
 */
export const ToastProvider = ToastPrimitive.Provider

/**
 * Props for ToastViewport.
 */
export type ToastViewportProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>

/**
 * Region where Toast notifications are rendered.
 */
export const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Viewport>, ToastViewportProps>(
  function ToastViewport({ className, ...props }, ref) {
    return <ToastPrimitive.Viewport ref={ref} className={cx('au-toast__viewport', className)} {...props} />
  },
)

/**
 * Props for Toast.
 */
export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
  /** Semantic toast intent. */
  intent?: AtelierIntent
}

/**
 * Toast notification root.
 */
export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(function Toast(
  { intent = 'neutral', className, ...props },
  ref,
) {
  return <ToastPrimitive.Root ref={ref} className={cx('au-toast', `au-toast--${intent}`, className)} {...props} />
})

/**
 * Toast title.
 */
export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(function ToastTitle({ className, ...props }, ref) {
  return <ToastPrimitive.Title ref={ref} className={cx('au-toast__title', className)} {...props} />
})

/**
 * Toast description.
 */
export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(function ToastDescription({ className, ...props }, ref) {
  return <ToastPrimitive.Description ref={ref} className={cx('au-toast__description', className)} {...props} />
})

/**
 * Toast action button.
 */
export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(function ToastAction({ className, ...props }, ref) {
  return <ToastPrimitive.Action ref={ref} className={cx('au-toast__action', className)} {...props} />
})

/**
 * Toast close button.
 */
export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(function ToastClose({ className, ...props }, ref) {
  return <ToastPrimitive.Close ref={ref} className={cx('au-toast__close', className)} {...props} />
})

/**
 * Props for ConfirmDialog.
 */
export type ConfirmDialogProps = {
  /** Controlled open state. */
  open?: boolean
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean
  /** Called when open state changes. */
  onOpenChange?: (open: boolean) => void
  /** Trigger element. */
  trigger?: React.ReactNode
  /** Dialog title. */
  title: React.ReactNode
  /** Dialog description. */
  description?: React.ReactNode
  /** Confirm button label. */
  confirmLabel?: React.ReactNode
  /** Cancel button label. */
  cancelLabel?: React.ReactNode
  /** Confirm button intent. */
  intent?: AtelierIntent
  /** Called when confirm is clicked. */
  onConfirm?: () => void
}

/**
 * Confirmation dialog for destructive or important actions. Business side effects stay in `onConfirm`.
 */
export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  intent = 'danger',
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger ? <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger> : null}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="au-dialog__overlay" />
        <AlertDialogPrimitive.Content className="au-dialog__content au-dialog__content--sm">
          <div className="au-dialog__header">
            <AlertDialogPrimitive.Title className="au-dialog__title">{title}</AlertDialogPrimitive.Title>
            {description ? (
              <AlertDialogPrimitive.Description className="au-dialog__description">{description}</AlertDialogPrimitive.Description>
            ) : null}
          </div>
          <div className="au-dialog__footer">
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="outline" intent="neutral">
                {cancelLabel}
              </Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button intent={intent} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

/**
 * Props for LoadingState.
 */
export type LoadingStateProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Loading label. */
  label?: React.ReactNode
  /** Spinner size. */
  size?: AtelierSize
}

/**
 * Centered loading indicator for panels and pages.
 */
export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(function LoadingState(
  { label = 'Loading', size = 'md', className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-loading-state', className)} role="status" {...props}>
      <Spinner size={size} />
      <span>{label}</span>
    </div>
  )
})

/**
 * Props for ErrorState.
 */
export type ErrorStateProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Error title. */
  title?: React.ReactNode
  /** Optional action area. */
  action?: React.ReactNode
}

/**
 * Error display for panels and pages.
 */
export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(function ErrorState(
  { title = 'Something went wrong', children, action, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-error-state', className)} role="alert" {...props}>
      <div className="au-error-state__title">{title}</div>
      {children ? <div className="au-error-state__body">{children}</div> : null}
      {action ? <div className="au-error-state__action">{action}</div> : null}
    </div>
  )
})
