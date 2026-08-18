// scripts/migrate-users.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../app/models/User';
import { config } from 'dotenv';

config();

async function migrateUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    const users = await User.find({});
    console.log(`Found ${users.length} users to migrate`);

    let migrated = 0;
    for (const user of users) {
      // Skip if already has password
      if (user.password && user.password.startsWith('$2')) {
        console.log(`User ${user.username} already has hashed password`);
        continue;
      }

      // Set default password
      const defaultPassword = `ChannelOS2026!`;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);
      
      user.password = hashedPassword;
      await user.save();
      migrated++;
      
      console.log(`Migrated user: ${user.username} with password: ${defaultPassword}`);
    }

    console.log(`Successfully migrated ${migrated} users`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateUsers();