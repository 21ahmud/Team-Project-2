import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  percentage,
  description,
  variants
}) => {
  return (
    <motion.div
      className="metric-card h-full"
      variants={variants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <Card className="neumorphic-card shadow-xl overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between">
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <motion.span 
                className="text-4xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {value.toLocaleString()}
              </motion.span>
              <span className="text-lg md:text-xl text-muted-foreground">{unit}</span>
            </div>
          </div>
          
          <div className="space-y-2 mt-auto">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{description}</span>
              <span className="text-foreground font-medium">{percentage}%</span>
            </div>
            <div className="progress-bar">
              <motion.div 
                className="progress-value"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MetricCard;