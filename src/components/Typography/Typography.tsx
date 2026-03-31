import { ElementType, ReactNode } from 'react'

type Variant =
  | 'display'
  | 'display-sm'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label'

interface TypographyProps {
  variant: Variant
  as?: ElementType
  className?: string
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  display:
    'font-display font-light text-display-2xl leading-[0.9] tracking-[-0.05em]',
  'display-sm':
    'font-display font-light text-display-lg leading-[1] tracking-[-0.04em]',
  h1: 'font-display font-light text-display-md leading-[1.05] tracking-[-0.03em]',
  h2: 'font-display font-light text-display-sm leading-[1.1] tracking-[-0.02em]',
  h3: 'font-body text-3xl leading-tight tracking-tight',
  h4: 'font-body text-xl leading-snug tracking-wide',
  'body-lg': 'font-body text-lg leading-relaxed',
  body: 'font-body text-base leading-relaxed',
  'body-sm': 'font-body text-sm leading-relaxed',
  caption: 'font-body text-xs leading-normal tracking-wide',
  label: 'font-body text-2xs uppercase tracking-[0.15em]',
}

const variantTags: Record<Variant, ElementType> = {
  display: 'h1',
  'display-sm': 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'p',
  label: 'span',
}

export default function Typography({ variant, as, className = '', children }: TypographyProps) {
  const Tag = as ?? variantTags[variant]
  return <Tag className={`${variantClasses[variant]} ${className}`}>{children}</Tag>
}
