import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using `clsx` and merges Tailwind CSS classes using `twMerge`.
 * @param inputs - An array of class values to be combined and merged.
 * @returns A string of combined and merged class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
