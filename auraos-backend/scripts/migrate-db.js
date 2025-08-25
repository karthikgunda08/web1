// scripts/migrate-db.js
import mongoose from 'mongoose';
import 'dotenv/config';
import { dbLogger } from '../src/utils/logger.js';

const migrations = [
    {
        version: 1,
        name: 'Add API key field to users',
        up: async (db) => {
            await db.collection('users').updateMany(
                { apiKey: { $exists: false } },
                { $set: { apiKey: null } }
            );
        }
    },
    {
        version: 2,
        name: 'Add onboarding fields to users',
        up: async (db) => {
            await db.collection('users').updateMany(
                { onboardingRewardClaimed: { $exists: false } },
                { 
                    $set: { 
                        onboardingRewardClaimed: false,
                        hasCompletedFirstMission: false
                    } 
                }
            );
        }
    },
    {
        version: 3,
        name: 'Add client access to projects',
        up: async (db) => {
            await db.collection('projects').updateMany(
                { clientAccess: { $exists: false } },
                {
                    $set: {
                        clientAccess: {
                            isEnabled: false,
                            shareableLink: null
                        }
                    }
                }
            );
        }
    }
];

const getCurrentVersion = async (db) => {
    const versionDoc = await db.collection('migrations').findOne({ _id: 'version' });
    return versionDoc ? versionDoc.current : 0;
};

const setVersion = async (db, version) => {
    await db.collection('migrations').updateOne(
        { _id: 'version' },
        { $set: { current: version } },
        { upsert: true }
    );
};

const runMigrations = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        dbLogger.info('Connected to MongoDB');

        const currentVersion = await getCurrentVersion(db.connection.db);
        dbLogger.info(`Current database version: ${currentVersion}`);

        for (const migration of migrations) {
            if (migration.version > currentVersion) {
                dbLogger.info(`Running migration ${migration.version}: ${migration.name}`);
                await migration.up(db.connection.db);
                await setVersion(db.connection.db, migration.version);
                dbLogger.info(`Completed migration ${migration.version}`);
            }
        }

        dbLogger.info('All migrations completed successfully');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        dbLogger.error('Migration failed', { error: error.message });
        process.exit(1);
    }
};

runMigrations();
