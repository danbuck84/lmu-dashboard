
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flag, LineChart, Timer, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-racing-black to-racing-gray opacity-90 z-0"></div>
        <div 
          className="absolute inset-0 opacity-20 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580264214452-c77a0500a7e9')" }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Le Mans Ultimate Race Tracker
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Track your races, analyze performance, and improve your racing skills with our comprehensive analytics platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-racing-red hover:bg-racing-red/90 text-white"
                onClick={() => navigate('/race-log')}
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white bg-black/30 hover:bg-white/20"
                onClick={() => navigate('/register')}
              >
                Register Now
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center p-1">
              <motion.div 
                className="w-1 h-2 bg-white rounded-full"
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Complete Racing Analytics Platform</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Comprehensive tools to help you analyze and improve your racing performance in Le Mans Ultimate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="rounded-full w-12 h-12 bg-racing-blue/10 flex items-center justify-center mb-4">
                <Flag className="text-racing-blue h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Race Logging</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Track every race with detailed information about your performance, car setup, and race conditions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="rounded-full w-12 h-12 bg-racing-red/10 flex items-center justify-center mb-4">
                <LineChart className="text-racing-red h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Performance Analysis</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Visualize your performance trends with interactive charts and detailed analytics.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="rounded-full w-12 h-12 bg-racing-black/10 flex items-center justify-center mb-4">
                <Trophy className="text-racing-black dark:text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Rating Progression</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Track your Driver Rating and Safety Rating progress over time to monitor your improvement.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="rounded-full w-12 h-12 bg-racing-silver/20 flex items-center justify-center mb-4">
                <Timer className="text-racing-gray dark:text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Lap Time Analysis</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Analyze your lap times and compare your performance across different cars and tracks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Racing Performance?</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Join our platform today and gain valuable insights into your racing performance. Track your progress, analyze your data, and become a better racer.
            </p>
            <Button 
              size="lg" 
              className="bg-racing-red hover:bg-racing-red/90 text-white"
              onClick={() => navigate('/register')}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-white/70">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p>© {new Date().getFullYear()} Le Mans Race Tracker. All rights reserved.</p>
            <p className="mt-2 text-sm">Not affiliated with Le Mans Ultimate or any official racing organization.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
