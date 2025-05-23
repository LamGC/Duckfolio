"use client"

import { getConfig } from "@/lib/config"
import Image from "next/image"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ChevronRight } from "lucide-react"


export const runtime = "edge";

export default function Home() {
  const config = getConfig()
  const [activeSection, setActiveSection] = useState("profile")
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full   text-[#121212] dark:text-[#f0f0f0] overflow-hidden flex flex-col"
    >

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: [0, -10, 0]  // 左右摇摆角度
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            rotate: {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,  // 无限重复
              repeatType: "loop"
            }
          }}
          className="text-xl font-medium"
        >
          <Image
            src='/logo.png'
            alt="Logo"
            width={40}
            height={40}
            priority
          />
        </motion.div>

        <motion.div
          className="flex space-x-4 sm:space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {["profile", "links"].map((section) => (
            <button
              key={section}
              className={`text-sm uppercase tracking-wider transition-colors ${activeSection === section
                ? "text-[#121212] dark:text-white"
                : "text-[#121212]/60 dark:text-white/60 hover:text-[#121212] dark:hover:text-white"
                }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
              {activeSection === section && (
                <motion.div
                  className="h-0.5 bg-[#121212] dark:bg-white mt-1"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 md:px-8 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto flex flex-col">
        <AnimatePresence mode="wait">
          {activeSection === "profile" ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center h-full flex-1 my-auto pt-24 md:pt-16"
            >
              {/* Profile image */}
              <motion.div
                className="relative aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] opacity-80 dark:opacity-60 blur-md transform -rotate-6 scale-95" />
                <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-[#121212]/10 dark:border-white/10 bg-[#f8f8f8] dark:bg-[#1a1a1a]">
                  <Image
                    src={config.basic.avatar || ""}
                    alt={config.basic.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Profile info */}
              <div className="space-y-12">
                <motion.div
                  className="space-y-4 md:space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight flex flex-wrap items-center">
                    {[..."Hello, ".split(''), ...(("I'm " + config.basic.name).split(''))].map((char, index) => (
                      <motion.span
                        key={`title-${index}`}
                        className={`inline-block ${index >= 7 ? "text-[var(--theme-primary)] dark:text-[var(--theme-secondary)]" : ""}`}
                        animate={{
                          y: [0, -15, 0]
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                          delay: index * 0.05,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </h1>
                  <p className="text-base sm:text-lg text-[#121212]/80 dark:text-white/80 max-w-lg">{config.basic.bio}</p>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                >
                  {config.socialLinks.map((link, index) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center justify-center p-2 rounded-full bg-[#f8f8f8]/50 dark:bg-[#1a1a1a]/50 text-[#121212]/70 dark:text-white/70 hover:text-[var(--theme-primary)] dark:hover:text-[var(--theme-secondary)] transition-all duration-300 hover:scale-110 hover:shadow-md"
                      aria-label={link.platform}
                      style={{
                        opacity: 0,
                        animation: `fadeIn 0.5s ease-out ${0.5 + index * 0.1}s forwards`,
                      }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: link.icon }} className="text-2xl" />
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-auto w-full pt-24 md:pt-32 pb-16"
            >
              <motion.h2
                className="text-2xl sm:text-3xl font-bold mb-8 md:mb-12 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="bg-[var(--theme-primary)]/10 dark:bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] dark:text-[var(--theme-secondary)] p-3 rounded-xl mr-4 flex items-center justify-center">
                  <ExternalLink size={24} />
                </span>
                我的链接
              </motion.h2>

              <div className="space-y-6">
                {config.websiteLinks.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-primary)]/20 to-[var(--theme-secondary)]/20 dark:from-[var(--theme-primary)]/10 dark:to-[var(--theme-secondary)]/10 rounded-2xl transform origin-left group-hover:scale-x-[1.02] transition-transform duration-300" />
                      <div className="relative flex items-center justify-between bg-white dark:bg-[#1a1a1a] rounded-2xl border border-[#121212]/5 dark:border-white/5 p-4 sm:p-6 group-hover:border-[var(--theme-primary)]/30 dark:group-hover:border-[var(--theme-secondary)]/30 transition-colors duration-300">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-medium text-[#121212] dark:text-white group-hover:text-[var(--theme-primary)] dark:group-hover:text-[var(--theme-secondary)] transition-colors duration-300">
                            {link.title}
                          </h3>
                          {link.description && (
                            <p className="text-sm sm:text-base text-[#121212]/70 dark:text-white/70 mt-2">{link.description}</p>
                          )}
                        </div>
                        <div className="text-[#121212]/40 dark:text-white/40 group-hover:text-[var(--theme-primary)] dark:group-hover:text-[var(--theme-secondary)] transform group-hover:translate-x-1 transition-all duration-300">
                          <ChevronRight size={24} />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 py-6 mt-auto text-center text-[#121212]/60 dark:text-white/60 text-sm"
      >
        <p className="mb-2">
          © {new Date().getFullYear()} {config.basic.name}. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/Yorlg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--theme-primary)]  dark:hover:text-[var(--theme-secondary)] transition-colors"
          >
            Yorlg
          </a>
          <span>•</span>
          <a
            href="https://github.com/Yorlg/Duckfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--theme-primary)]  dark:hover:text-[var(--theme-secondary)] transition-colors"
          >
            Duckfolio
          </a>
        </div>
      </motion.footer>
    </div>
  )
}
