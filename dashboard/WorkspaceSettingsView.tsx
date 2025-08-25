// src/components/dashboard/WorkspaceSettingsView.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../state/appStore';
import { Button } from '../ui/Button';

const MotionDiv = motion.div as any;

const TabButton: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode }> = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
            isActive ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-white'
        }`}
    >
        {children}
    </button>
);

const MembersTab: React.FC = () => {
    // This will eventually show workspace members. For now, it's a placeholder.
    return (
        <div className="p-6 bg-slate-800/50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Workspace Members</h3>
            <p className="text-slate-400">Full Role-Based Access Control (RBAC) is coming soon. You'll be able to invite team members to your workspace and assign roles like Admin, Editor, and Viewer.</p>
        </div>
    );
};

const BillingTab: React.FC = () => {
    // Placeholder for usage-based billing
    return (
        <div className="p-6 bg-slate-800/50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Subscription & Billing</h3>
            <p className="text-slate-400">Manage your subscription plan, view invoices, and monitor your usage here. Usage-based billing and enterprise plans powered by Stripe/Razorpay are coming soon.</p>
        </div>
    );
};

const SecurityTab: React.FC = () => {
    // Placeholder for data governance features
    return (
        <div className="p-6 bg-slate-800/50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Data & Security</h3>
            <p className="text-slate-400">Enterprise-grade data governance features are under development, including:</p>
            <ul className="list-disc list-inside text-slate-400 mt-2">
                <li>Automated daily backups</li>
                <li>Point-in-Time-Recovery (PITR)</li>
                <li>Custom data retention policies</li>
                <li>Encryption at rest with KMS integration</li>
            </ul>
        </div>
    );
};


const WorkspaceSettingsView: React.FC = () => {
    const { currentUser } = useAppStore();
    const [activeTab, setActiveTab] = useState<'members' | 'billing' | 'security'>('members');

    const renderContent = () => {
        switch (activeTab) {
            case 'members': return <MembersTab />;
            case 'billing': return <BillingTab />;
            case 'security': return <SecurityTab />;
            default: return null;
        }
    };
    
    return (
        <div className="flex-grow p-4 md:p-8 overflow-y-auto animated-gradient-bg-studio">
            <div className="max-w-5xl mx-auto">
                 <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{currentUser?.name || 'My'} Workspace</h1>
                    <p className="text-lg text-slate-300">Manage your team, billing, and security settings.</p>
                </header>

                <div className="border-b border-slate-700 mb-6">
                    <nav className="flex flex-wrap -mb-px">
                        <TabButton isActive={activeTab === 'members'} onClick={() => setActiveTab('members')}>Members & Access</TabButton>
                        <TabButton isActive={activeTab === 'billing'} onClick={() => setActiveTab('billing')}>Billing</TabButton>
                        <TabButton isActive={activeTab === 'security'} onClick={() => setActiveTab('security')}>Security</TabButton>
                    </nav>
                </div>
                
                <AnimatePresence mode="wait">
                    <MotionDiv
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderContent()}
                    </MotionDiv>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WorkspaceSettingsView;