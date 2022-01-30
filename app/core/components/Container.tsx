import React, { Children, ReactNode } from "react"
import { overrideTailwindClasses } from "tailwind-override"

type Ref = ReactNode | HTMLElement | string

type ContainerProps = {
  className?: string
  children?: ReactNode
  centerContents?: boolean
}

const Container = React.forwardRef<Ref, ContainerProps>(function Container(
  { className, children, centerContents }: ContainerProps,
  ref: React.Ref<HTMLDivElement>
) {
  const classNames = overrideTailwindClasses(
    `min-h-screen max-w-7xl mx-auto sm:px-6 lg:px-8 ${className} ${
      centerContents && "flex justify-center items-center"
    }`
  )
  return (
    <div ref={ref} className={classNames}>
      {children}
    </div>
  )
})

export default Container
