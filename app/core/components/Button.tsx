import React, { ReactNode } from "react"
import clsx from "clsx"
import { overrideTailwindClasses } from "tailwind-override"
//import warn from './utils/warning'

type IconType =
  | string
  | React.FunctionComponent<{ className: string; "aria-hidden": boolean }>
  | React.ComponentClass<{ className: string; "aria-hidden": boolean }>

export interface Props {
  children?: ReactNode
  /**
   * Defines if the button is disabled
   */
  disabled?: boolean
  /**
   * The size of the button
   */
  size?: "xlarge" | "large" | "regular" | "small" | "xsmall" | "pagination"
  /**
   * Shows only one icon inside the button; defaults to left
   */
  icon?: IconType
  /**
   * Shows an icon inside the button, left aligned
   */
  iconLeft?: IconType
  /**
   * Shows an icon inside the button, right aligned
   */
  iconRight?: IconType
  /**
   * The style of the button
   */
  layout?: "white" | "secondary" | "primary"
  /**
   * Shows the button as a block (full width)
   */
  block?: boolean
  /**
   * testId for querying element in tests
   */
  testId?: string
}

export interface ButtonAsButtonProps extends Props, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The element that should be rendered as a button
   */
  tag?: "button" | "a"
  /**
   * The native HTML button type
   */
  type?: "button" | "submit" | "reset"
}

export interface ButtonAsAnchorProps extends Props, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: "a"
}

export interface ButtonAsOtherProps extends Props, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: string
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps | ButtonAsOtherProps

type Ref = ReactNode | HTMLElement | string

const styles = {
  base: "inline-flex items-center px-2.5 py-1.5 border",
  size: {
    xsmall: "px-2.5 py-1.5 text-xs font-medium rounded",
    small: "px-3 py-2 text-sm leading-4 font-medium rounded-md",
    regular: "px-4 py-2 text-base font-bold rounded-md",
    large: "px-5 py-3 text-base font-bold rounded-md",
    xlarge: "px-6 py-3 text-base font-bold rounded-md",
    icon: {
      xlarge: "p-6 rounded-md",
      large: "p-4 rounded-md",
      regular: "p-4 rounded-md",
      small: "p-3 rounded-md",
      xsmall: "p-2.5 rounded",
    },
  },
  block: "w-full flex justify-center",
  primary: {
    base: "text-white bg-blue-500 border-transparent shadow-sm",
    active:
      "active:bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    disabled: "opacity-50 cursor-not-allowed",
  },
  secondary: {
    base: "text-blue-700 bg-blue-100 border-transparent shadow-sm ",
    active:
      "active:bg-blue-200 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    disabled: "opacity-50 cursor-not-allowed",
  },
  white: {
    base: "text-gray-700 bg-white border border-gray-300 ",
    active:
      "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    disabled: "opacity-50 cursor-not-allowed",
  },
  icon: {
    xlarge: "h-5 w-5",
    large: "h-5 w-5",
    regular: "h-5 w-5",
    small: "h-4 w-4",
    xsmall: "h-4 w-4",
    left: "-ml-1 mr-2",
    right: "ml-2 -mr-1",
  },
}

const Button = React.forwardRef<Ref, ButtonProps>(function Button(props: ButtonProps, ref) {
  const {
    tag = "button",
    type = tag === "button" ? "button" : undefined,
    disabled = false,
    size = "regular",
    layout = "primary",
    block = false,
    icon,
    iconLeft,
    iconRight,
    className,
    children,
    testId,
    ...other
  } = props

  function hasIcon() {
    return !!icon || !!iconLeft || !!iconRight
  }

  const IconLeft = iconLeft || icon
  const IconRight = iconRight

  const baseStyle = styles.base
  const blockStyle = styles.block

  const sizeStyles = {
    xlarge: styles.size.xlarge,
    large: styles.size.large,
    regular: styles.size.regular,
    small: styles.size.small,
    xsmall: styles.size.xsmall,
  }
  const iconSizeStyles = {
    xlarge: styles.size.icon.xlarge,
    large: styles.size.icon.large,
    regular: styles.size.icon.regular,
    small: styles.size.icon.small,
    xsmall: styles.size.icon.xsmall,
    pagination: styles.size.icon.regular,
  }
  const iconStyle = styles.icon[size]
  //const iconStyle = styles.icon[size]
  const layoutStyles = {
    primary: styles.primary.base,
    secondary: styles.secondary.active,
    white: styles.white.base,
    //link: styles.link.base,
  }
  const activeStyles = {
    primary: styles.primary.active,
    secondary: styles.secondary.active,
    white: styles.white.active,
    //link: styles.link.active,
  }
  const disabledStyles = {
    primary: styles.primary.disabled,
    secondary: styles.secondary.disabled,
    white: styles.white.disabled,
  }

  const buttonStyles = clsx(
    baseStyle,
    // has icon but no children
    hasIcon() && !children && iconSizeStyles[size],
    // has icon and children
    hasIcon() && children && sizeStyles[size],
    // does not have icon
    !hasIcon() && sizeStyles[size],
    layoutStyles[layout],
    disabled ? disabledStyles[layout] : activeStyles[layout],
    block ? blockStyle : null,
    className
  )

  const iconLeftStyles = clsx(iconStyle, children ? styles.icon.left : "")
  const iconRightStyles = clsx(iconStyle, children ? styles.icon.right : "")

  return React.createElement(
    tag,
    {
      className: overrideTailwindClasses(buttonStyles),
      ref,
      disabled,
      type,
      "data-testid": testId,
      ...other,
    },
    IconLeft
      ? React.createElement(IconLeft, { className: iconLeftStyles, "aria-hidden": true })
      : null,
    children,
    IconRight
      ? React.createElement(IconRight, { className: iconRightStyles, "aria-hidden": true })
      : null
  )
})

export default Button
