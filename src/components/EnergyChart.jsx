import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const EnergyChart = ({ variants }) => {
  const weeklyData = [
    { day: "Mon", activations: 3200, energy: 280 },
    { day: "Tue", activations: 4100, energy: 350 },
    { day: "Wed", activations: 3800, energy: 310 },
    { day: "Thu", activations: 4500, energy: 400 },
    { day: "Fri", activations: 4200, energy: 370 },
    { day: "Sat", activations: 3000, energy: 250 },
    { day: "Sun", activations: 3850, energy: 320 },
  ];

  const maxEnergy = Math.max(...weeklyData.map(item => item.energy), 0) || 1;

  return (
    <motion.div variants={variants}>
      <Card className="neumorphic-card shadow-xl h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Weekly Energy Generation</CardTitle>
          <CardDescription className="text-muted-foreground">Overview of energy produced in the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="h-72 md:h-80">
            <div className="flex h-full items-end justify-between gap-2 md:gap-3">
              {weeklyData.map((item, index) => {
                const heightPercentage = (item.energy / maxEnergy) * 100;
                
                return (
                  <div key={item.day} className="flex flex-col items-center gap-2 w-full h-full justify-end">
                    <motion.div 
                      className="relative w-full max-w-[30px] md:max-w-[45px] rounded-t-md bg-gradient-to-t from-primary/70 to-primary energy-glow"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${heightPercentage}%`, opacity: 1 }}
                      transition={{ 
                        duration: 1.2, 
                        delay: index * 0.15 + 0.5,
                        ease: [0.16, 1, 0.3, 1]  // More expressive ease
                      }}
                      whileHover={{ scaleY: 1.05, backgroundColor: "hsl(var(--accent))" }}
                    >
                      <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-foreground text-xs md:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.energy}Wh
                      </div>
                    </motion.div>
                    <span className="text-muted-foreground text-xs sm:text-sm font-medium pt-1">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neumorphic-card-inset p-4">
              <p className="text-muted-foreground text-sm">Average Daily Generation</p>
              <p className="text-foreground text-2xl md:text-3xl font-bold mt-1">
                {Math.round(weeklyData.reduce((acc, item) => acc + item.energy, 0) / weeklyData.length)} Wh
              </p>
            </div>
            
            <div className="neumorphic-card-inset p-4">
              <p className="text-muted-foreground text-sm">Total Weekly Generation</p>
              <p className="text-foreground text-2xl md:text-3xl font-bold mt-1">
                {weeklyData.reduce((acc, item) => acc + item.energy, 0).toLocaleString()} Wh
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnergyChart;