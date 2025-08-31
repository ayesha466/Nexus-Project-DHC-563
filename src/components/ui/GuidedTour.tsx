import React from 'react';
import Joyride, { Step } from 'react-joyride';

const steps: Step[] = [
  {
    target: '.sidebar',
    content: 'Use the sidebar to navigate between modules like Dashboard, Documents, and Deals.',
  },
  {
    target: '.navbar',
    content: 'Access messages, notifications, and your profile from the top navigation.',
  },
  {
    target: '.dashboard-main',
    content: 'This is your main dashboard. Key features and modules appear here.',
  },
  {
    target: '.calendar-section',
    content: 'Schedule meetings and view upcoming events in the calendar.',
  },
  {
    target: '.video-call-section',
    content: 'Start or join video calls for collaboration.',
  },
  {
    target: '.document-chamber-section',
    content: 'Upload, sign, and manage documents securely.',
  },
  {
    target: '.payment-section',
    content: 'Manage your wallet, transactions, and funding deals here.',
  },
];

export const GuidedTour: React.FC = () => (
  <Joyride
    steps={steps}
    continuous
    showSkipButton
    showProgress
    styles={{ options: { zIndex: 10000 } }}
  />
);
