"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: "group toast group-[.toaster]:bg-white/80 group-[.toaster]:backdrop-blur-xl group-[.toaster]:border-white/20 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-5",
          description: "group-[.toast]:text-gray-700 group-[.toast]:text-sm group-[.toast]:mt-1.5",
          actionButton: "group-[.toast]:bg-gradient-to-r group-[.toast]:from-blue-500 group-[.toast]:to-purple-600 group-[.toast]:text-white group-[.toast]:rounded-lg group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:font-medium group-[.toast]:shadow-lg group-[.toast]:hover:shadow-xl group-[.toast]:transition-all",
          cancelButton: "group-[.toast]:bg-white/50 group-[.toast]:backdrop-blur-sm group-[.toast]:text-gray-700 group-[.toast]:rounded-lg group-[.toast]:border group-[.toast]:border-gray-300/50",
          closeButton: "group-[.toast]:bg-white/80 group-[.toast]:backdrop-blur-sm group-[.toast]:border-white/40 group-[.toast]:rounded-lg group-[.toast]:hover:bg-white/90 group-[.toast]:transition-all",
          error: "group-[.toast]:bg-gradient-to-br group-[.toast]:from-red-50/95 group-[.toast]:to-pink-50/95 group-[.toast]:backdrop-blur-xl group-[.toast]:border-red-200/40 group-[.toast]:text-red-900",
          success: "group-[.toast]:bg-gradient-to-br group-[.toast]:from-green-50/95 group-[.toast]:to-emerald-50/95 group-[.toast]:backdrop-blur-xl group-[.toast]:border-green-200/40 group-[.toast]:text-green-900",
          warning: "group-[.toast]:bg-gradient-to-br group-[.toast]:from-yellow-50/95 group-[.toast]:to-amber-50/95 group-[.toast]:backdrop-blur-xl group-[.toast]:border-yellow-200/40 group-[.toast]:text-yellow-900",
          info: "group-[.toast]:bg-gradient-to-br group-[.toast]:from-blue-50/95 group-[.toast]:to-cyan-50/95 group-[.toast]:backdrop-blur-xl group-[.toast]:border-blue-200/40 group-[.toast]:text-blue-900",
          title: "group-[.toast]:text-base group-[.toast]:font-semibold group-[.toast]:tracking-tight",
        },
      }}
      position="top-right"
      expand={true}
      richColors={false}
      {...props}
    />
  )
}

export { Toaster }
