import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const MobileSidebar = ({ isOpen, onClose, categories = [] }) => {
  const navItems = [
    { path: "/", label: "All Tasks", icon: "List", exact: true },
    { path: "/today", label: "Today", icon: "Calendar", exact: false },
    { path: "/upcoming", label: "Upcoming", icon: "Clock", exact: false }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-64 bg-surface/95 backdrop-blur-md border-r border-white/10 z-50 lg:hidden flex flex-col"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="CheckSquare" size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-display font-bold gradient-text">TaskFlow</h1>
                    <p className="text-sm text-slate-400">Geometric Productivity</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sidebar-item ${isActive ? "active" : ""}`
                    }
                  >
                    <ApperIcon name={item.icon} size={20} className="text-slate-400 group-hover:text-slate-200" />
                    <span className="font-medium text-slate-200 group-hover:text-white">
                      {item.label}
                    </span>
                  </NavLink>
                ))}
              </div>

              {categories.length > 0 && (
                <div className="pt-6">
                  <h3 className="px-4 py-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <NavLink
                        key={category.Id}
                        to={`/category/${category.Id}`}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `sidebar-item ${isActive ? "active" : ""}`
                        }
                      >
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <ApperIcon name={category.icon} size={18} className="text-slate-400 group-hover:text-slate-200" />
                        <span className="font-medium text-slate-200 group-hover:text-white">
                          {category.name}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            <div className="p-4 border-t border-white/10">
              <div className="glass-card rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <ApperIcon name="Zap" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">Stay Productive</p>
                    <p className="text-xs text-slate-400">Geometric efficiency</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;