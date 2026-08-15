import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/User';
import Channel from '@/app/models/Channel';
import Post from '@/app/models/Post';
import Notification from '@/app/models/Notification';
import Earnings from '@/app/models/Earnings';

// Dummy data from your Flutter app
const seedData = {
  users: [
    {
      id: 'user1',
      name: 'John Doe',
      username: '@johndoe',
      profileImage: 'https://picsum.photos/seed/johndoe/200/200',
      bio: 'ChannelOS Creator | Tech Enthusiast',
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'user2',
      name: 'Sarah Smith',
      username: '@sarahsmith',
      profileImage: 'https://picsum.photos/seed/sarahsmith/200/200',
      bio: 'Sports Journalist',
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'user3',
      name: 'Mike Johnson',
      username: '@mikejohnson',
      profileImage: 'https://picsum.photos/seed/mikejohnson/200/200',
      bio: 'Business Analyst',
      joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'user4',
      name: 'TechCrunch Kenya',
      username: '@techcrunchkenya',
      profileImage: 'https://picsum.photos/seed/techcrunch/200/200',
      bio: 'Global tech news from Kenya',
      joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'user5',
      name: 'African Startups',
      username: '@africanstartups',
      profileImage: 'https://picsum.photos/seed/africanstartups/200/200',
      bio: 'Startup ecosystem across Africa',
      joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    },
  ],
  channels: [
    {
      id: 'ch1',
      name: 'Tech Kenya',
      handle: '@techkenya',
      description: 'Latest tech news and innovations from Kenya',
      imageUrl: 'https://picsum.photos/seed/techkenya/400/400',
      category: 'Technology',
      isPublic: true,
      ownerId: 'user1',
      adminIds: ['user1'],
      memberIds: ['user1', 'user2', 'user3'],
      memberCount: 2841,
      postCount: 128,
      views: 24000,
      engagement: 1870,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'ch2',
      name: 'Football Kenya',
      handle: '@footballkenya',
      description: 'All about Kenyan football',
      imageUrl: 'https://picsum.photos/seed/footballkenya/400/400',
      category: 'Sports',
      isPublic: true,
      ownerId: 'user2',
      adminIds: ['user2'],
      memberIds: ['user1', 'user2', 'user4'],
      memberCount: 1925,
      postCount: 86,
      views: 31000,
      engagement: 2200,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'ch3',
      name: 'Nairobi Deals',
      handle: '@nairosideals',
      description: 'Best deals and offers in Nairobi',
      imageUrl: 'https://picsum.photos/seed/nairosideals/400/400',
      category: 'Deals',
      isPublic: true,
      ownerId: 'user1',
      adminIds: ['user1'],
      memberIds: ['user1', 'user5', 'user6'],
      memberCount: 860,
      postCount: 45,
      views: 6500,
      engagement: 780,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'ch4',
      name: 'Business Kenya',
      handle: '@businesskenya',
      description: 'Business news and opportunities',
      imageUrl: 'https://picsum.photos/seed/businesskenya/400/400',
      category: 'Business',
      isPublic: true,
      ownerId: 'user3',
      adminIds: ['user3'],
      memberIds: ['user1', 'user3', 'user7'],
      memberCount: 510,
      postCount: 32,
      views: 2800,
      engagement: 420,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'ch5',
      name: 'TechCrunch Kenya',
      handle: '@techcrunchkenya',
      description: 'Global tech news from Kenya',
      imageUrl: 'https://picsum.photos/seed/techcrunch/400/400',
      category: 'Technology',
      isPublic: true,
      ownerId: 'user4',
      adminIds: ['user4'],
      memberIds: ['user1', 'user4'],
      memberCount: 12500,
      postCount: 340,
      views: 85000,
      engagement: 6800,
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'ch6',
      name: 'African Startups',
      handle: '@africanstartups',
      description: 'Startup ecosystem across Africa',
      imageUrl: 'https://picsum.photos/seed/africanstartups/400/400',
      category: 'Business',
      isPublic: true,
      ownerId: 'user5',
      adminIds: ['user5'],
      memberIds: ['user1', 'user5'],
      memberCount: 4560,
      postCount: 190,
      views: 28000,
      engagement: 3400,
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    },
  ],
  posts: [
    {
      id: 'p1',
      channelId: 'ch1',
      authorId: 'user1',
      content: '🚀 Just discovered that the iPhone 17 has a revolutionary hidden feature! Check it out:',
      imageUrl: 'https://picsum.photos/seed/iphone17/600/400',
      likes: 342,
      comments: 87,
      shares: 124,
      views: 2842,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 'p2',
      channelId: 'ch2',
      authorId: 'user2',
      content: '⚽ BREAKING: Kenyan Premier League to expand to 20 teams next season! Huge news for local football. What are your thoughts?',
      imageUrl: 'https://picsum.photos/seed/football/600/400',
      likes: 456,
      comments: 112,
      shares: 89,
      views: 3200,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: 'p3',
      channelId: 'ch3',
      authorId: 'user1',
      content: '🛍️ BIG DEAL: 50% off at Java House this weekend! Use code: CHANNELOS50',
      imageUrl: 'https://picsum.photos/seed/deals/600/400',
      likes: 189,
      comments: 34,
      shares: 56,
      views: 1200,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      id: 'p4',
      channelId: 'ch5',
      authorId: 'user4',
      content: '📰 Kenya\'s tech ecosystem raises $500M in 2026 - a record year for African startups!',
      imageUrl: 'https://picsum.photos/seed/techcrunchpost/600/400',
      likes: 234,
      comments: 78,
      shares: 156,
      views: 3400,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      id: 'p5',
      channelId: 'ch6',
      authorId: 'user5',
      content: '💡 Meet the 10 African startups selected for Y Combinator Winter 2026 batch. Game changers!',
      imageUrl: 'https://picsum.photos/seed/ycombinator/600/400',
      likes: 167,
      comments: 45,
      shares: 89,
      views: 2100,
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    },
    {
      id: 'p6',
      channelId: 'ch4',
      authorId: 'user3',
      content: '📈 NSE closes at all-time high as tech stocks surge. Here\'s what you need to know:',
      imageUrl: 'https://picsum.photos/seed/nse/600/400',
      likes: 98,
      comments: 23,
      shares: 34,
      views: 800,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
  ],
  notifications: [
    {
      id: 'n1',
      userId: 'user1',
      type: 'post',
      title: 'New post in Tech Kenya',
      message: 'John posted: "Just discovered that the iPhone 17..."',
      channelId: 'ch1',
      postId: 'p1',
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: 'n2',
      userId: 'user1',
      type: 'reply',
      title: 'New reply',
      message: 'Sarah replied to your comment: "Great points!"',
      channelId: 'ch1',
      postId: 'p1',
      isRead: false,
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: 'n3',
      userId: 'user1',
      type: 'react',
      title: 'New reaction',
      message: 'Mike reacted to your post with 🔥',
      channelId: 'ch2',
      postId: 'p2',
      isRead: true,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: 'n4',
      userId: 'user1',
      type: 'announcement',
      title: 'Channel Announcement',
      message: 'Football Kenya is going live tomorrow at 7PM!',
      channelId: 'ch2',
      isRead: false,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
  ],
  earnings: {
    userId: 'user1',
    available: 245.00,
    pending: 50.00,
    totalEarned: 1240.00,
  },
};

export async function POST() {
  try {
    await connectToDatabase();

    // Clear existing data
    await User.deleteMany({});
    await Channel.deleteMany({});
    await Post.deleteMany({});
    await Notification.deleteMany({});
    await Earnings.deleteMany({});

    // Insert seed data
    await User.insertMany(seedData.users);
    await Channel.insertMany(seedData.channels);
    await Post.insertMany(seedData.posts);
    await Notification.insertMany(seedData.notifications);
    await Earnings.create(seedData.earnings);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        users: seedData.users.length,
        channels: seedData.channels.length,
        posts: seedData.posts.length,
        notifications: seedData.notifications.length,
        earnings: 1,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}