'use client';

import { useEffect, useState } from 'react';
import { FileJson, FileCode, Database, Terminal, Cpu, Globe, Code2, Braces } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = [
  FileJson, FileCode, Database, Terminal, Cpu, Globe, Code2, Braces
];

export function FloatingIcons() {
  const [floatingIcons, setFloatingIcons] = useState([]);

  useEffect(() => {
    // Generate random positions for icons
    const newIcons = icons.map((Icon, i) => ({
      Icon,
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
    setFloatingIcons(newIcons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-20 z-0">
        {floatingIcons.map(({ Icon, id, x, y, duration, delay }) => (
            <motion.div
                key={id}
                className="absolute text-primary/40"
                initial={{ x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
                animate={{
                    y: [`${y}vh`, `${y - 20}vh`, `${y + 10}vh`],
                    x: [`${x}vw`, `${x + 10}vw`, `${x - 10}vw`],
                    opacity: [0, 0.5, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay
                }}
            >
                <Icon size={40 + Math.random() * 40} />
            </motion.div>
        ))}
    </div>
  );
}
