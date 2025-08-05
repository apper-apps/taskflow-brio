import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ onToggleMobileMenu, className = "" }) => {
  return (
    <header className={`bg-surface/30 backdrop-blur-md border-b border-white/10 ${className}`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMobileMenu}
              icon="Menu"
              className="lg:hidden p-2"
            />
            
            <div className="flex items-center space-x-3 lg:hidden">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold gradient-text">TaskFlow</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
              <ApperIcon name="Zap" size={16} className="text-accent" />
              <span>Geometric Productivity</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;