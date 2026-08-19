// js/gamification.js
import { gsap } from 'gsap';

const LEVELS = [
  { threshold: 0, title: '🟢 Visitor' },
  { threshold: 50, title: '🔵 Explorer' },
  { threshold: 100, title: '🟣 Hacker' },
  { threshold: 200, title: '🟡 Legend' }
];

const MAX_XP = 200;

class GamificationSystem {
  constructor() {
    this.xp = parseInt(localStorage.getItem('saharsh_xp') || '0');
    this.awardedActions = JSON.parse(localStorage.getItem('saharsh_awarded_actions') || '{}');
    
    this.xpElement = document.getElementById('xp-current');
    this.fillElement = document.getElementById('xp-fill');
    this.levelElement = document.getElementById('xp-level');
    this.toastContainer = document.getElementById('xp-toast-container');
    
    this.init();
  }
  
  init() {
    // Show bar after a short delay
    setTimeout(() => {
      document.getElementById('xp-bar')?.classList.add('visible');
      this.updateUI();
    }, 2000);
  }
  
  awardXP(amount, actionId, message) {
    // Prevent double awarding for unique actions
    if (this.awardedActions[actionId]) return;
    
    this.xp += amount;
    this.awardedActions[actionId] = true;
    
    // Save state
    localStorage.setItem('saharsh_xp', this.xp.toString());
    localStorage.setItem('saharsh_awarded_actions', JSON.stringify(this.awardedActions));
    
    this.updateUI();
    this.showToast(`+${amount} XP: ${message}`);
    
    this.checkLevelUp();
  }
  
  updateUI() {
    if (!this.xpElement) return;
    
    // Animate number
    gsap.to(this.xpElement, {
      innerText: this.xp,
      duration: 1,
      snap: { innerText: 1 }
    });
    
    // Update progress bar
    const percentage = Math.min((this.xp / MAX_XP) * 100, 100);
    if (this.fillElement) {
      this.fillElement.style.width = `${percentage}%`;
    }
    
    // Update level text
    const currentLevel = this.getCurrentLevel();
    if (this.levelElement && this.levelElement.innerText !== currentLevel.title) {
      this.levelElement.innerText = currentLevel.title;
      // Pulse effect on level up
      gsap.fromTo(this.levelElement, 
        { scale: 1.2, color: 'var(--neon-green)' },
        { scale: 1, color: 'var(--text-primary)', duration: 0.5 }
      );
    }
  }
  
  getCurrentLevel() {
    let current = LEVELS[0];
    for (const level of LEVELS) {
      if (this.xp >= level.threshold) {
        current = level;
      }
    }
    return current;
  }
  
  checkLevelUp() {
    // We can add specific logic here if they hit exact thresholds this session
    // For now, updateUI handles the level text. 
    // Additional effects like confetti could go here if previous level != current level.
  }
  
  showToast(message) {
    if (!this.toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.innerHTML = `
      <span class="xp-toast-icon">✨</span>
      <span>${message}</span>
    `;
    
    this.toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
}

// Export singleton instance
export const GameSystem = new GamificationSystem();
