import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, Activity, Award, Lightbulb, Users } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import EnergyChart from "@/components/EnergyChart";
import AdvantageCard from "@/components/AdvantageCard";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState({
    tileActivations: { current: 0, target: 5000 },
    pressureApplied: { current: 0, target: 1000 },
    energyGenerated: { current: 0, target: 500 }
  });
  
  const [advantagesData, setAdvantagesData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const storedData = localStorage.getItem("smartTileData");
        let currentData;
        if (storedData) {
          currentData = JSON.parse(storedData);
          setMetrics(currentData);
        } else {
          currentData = {
            tileActivations: { current: 3850, target: 5000 },
            pressureApplied: { current: 750, target: 1000 },
            energyGenerated: { current: 320, target: 500 }
          };
          setMetrics(currentData);
          localStorage.setItem("smartTileData", JSON.stringify(currentData));
        }

        setAdvantagesData([
          {
            id: 1,
            title: "Peak Efficiency Time",
            description: "Highest energy generation observed between 2 PM - 4 PM daily.",
            value: "2-4 PM",
            icon: <Lightbulb className="h-6 w-6" />,
          },
          {
            id: 2,
            title: "High Traffic Zone",
            description: "Area near main entrance shows 60% more activations.",
            value: "Main Entrance",
            icon: <Users className="h-6 w-6" />,
          },
          {
            id: 3,
            title: "Energy Saved",
            description: `Equivalent to ${Math.round(currentData.energyGenerated.current * 0.0007)} kg of CO2 offset this month.`,
            value: `${Math.round(currentData.energyGenerated.current * 0.0007)} kg`,
            icon: <Award className="h-6 w-6" />,
          },
        ]);
        
        toast({
          title: "Dashboard Synced",
          description: "Smart tile metrics and insights are up to date.",
          duration: 3500,
          className: "bg-primary text-primary-foreground"
        });
      } catch (error) {
        toast({
          title: "Sync Error",
          description: "Could not sync smart tile metrics.",
          variant: "destructive",
          duration: 3000,
        });
      }
    };
    
    loadData();
  }, [toast]);
  
  const calculatePercentage = (current, target) => {
    if (target === 0) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">Smart Tile Dashboard</h1>
        <p className="text-muted-foreground text-lg md:text-xl">Real-time analytics & insights from your smart tile network.</p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MetricCard
          title="Tile Activations"
          value={metrics.tileActivations.current}
          unit="activations"
          icon={<Activity className="h-7 w-7 text-primary" />}
          percentage={calculatePercentage(metrics.tileActivations.current, metrics.tileActivations.target)}
          description={`Daily Goal: ${metrics.tileActivations.target.toLocaleString()} activations`}
          variants={itemVariants}
        />
        
        <MetricCard
          title="Pressure Applied"
          value={metrics.pressureApplied.current}
          unit="kg"
          icon={<TrendingUp className="h-7 w-7 text-primary" />}
          percentage={calculatePercentage(metrics.pressureApplied.current, metrics.pressureApplied.target)}
          description={`Peak Load Today: ${metrics.pressureApplied.target} kg`}
          variants={itemVariants}
        />
        
        <MetricCard
          title="Energy Generated"
          value={metrics.energyGenerated.current}
          unit="Wh"
          icon={<Zap className="h-7 w-7 text-primary" />}
          percentage={calculatePercentage(metrics.energyGenerated.current, metrics.energyGenerated.target)}
          description={`Est. Daily Output: ${metrics.energyGenerated.target.toLocaleString()} Wh`}
          variants={itemVariants}
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:col-span-2">
          <EnergyChart variants={itemVariants}/>
        </div>
        <div className="space-y-6 md:space-y-8 lg:col-span-1">
           <AnimatePresence>
            {advantagesData.map((advantage, index) => (
              <AdvantageCard 
                key={advantage.id}
                title={advantage.title}
                description={advantage.description}
                value={advantage.value}
                icon={advantage.icon}
                customTransitionDelay={index * 0.15}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;