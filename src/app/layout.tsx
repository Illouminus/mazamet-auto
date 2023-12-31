import React from "react";
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {AuthProvider} from "@/providers/AuthProvider/AuthProvider";
import {StoreProvider} from "@/providers/StoreProvider/StoreProvider";
import {NavProvider} from "@/providers/NavProvider/NavProvider";



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MAZAMET - PIECES AUTO',
  description: 'En ligne ⏰ 24/7 ⏩ ⏩ Achat de pièces détachées pour RENAULT, PEUGEOT, CITROЁN, BMW, Audi, Mercedes et d\'autres fabricants en ligne',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="fr">
      <body className={inter.className}>
      <StoreProvider>
      <AuthProvider>
         <NavProvider>
              {children}
         </NavProvider>
      </AuthProvider>
      </StoreProvider>
      </body>
    </html>
  )
}
