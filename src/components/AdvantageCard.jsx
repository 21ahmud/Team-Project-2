import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdvantageCard = ({ title, description, value, icon, customTransitionDelay = 0 }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        delay: customTransitionDelay 
      } 
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="advantage-card"
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <Card className="neumorphic-card shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-foreground">
            {title}
          </CardTitle>
          <div className="advantage-card-icon">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{value}</div>
          <p className="text-xs text-muted-foreground pt-1">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdvantageCard;