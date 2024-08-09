import mongoose from 'mongoose';
import { UserSchema } from '../model/user.schema';
import { VideoSchema } from '../model/video.schema';

// Connect to your MongoDB database
mongoose
  .connect(
    'mongodb+srv://shubhankarbhanot:aqBdf3maBgr0CeYr@videos.magm5tj.mongodb.net/videos?retryWrites=true&w=majority&appName=videos',
  )
  .then(() => {
    console.log('MongoDB connected successfully');
    seedData();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define models
const User = mongoose.model('User', UserSchema);
const Video = mongoose.model('Video', VideoSchema);

// Function to seed dummy data
async function seedData() {
  try {
    // Create dummy users
    const user1 = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const user2 = new User({
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
    });

    // Save dummy users to the database
    await user1.save();
    await user2.save();

    // Create dummy videos
    const video1 = new Video({
      title: 'Sample Video 1',
      video: 'video1.mp4',
      coverImage: 'cover1.jpg',
      createdBy: user1._id,
    });

    const video2 = new Video({
      title: 'Sample Video 2',
      video: 'video2.mp4',
      coverImage: 'cover2.jpg',
      createdBy: user2._id,
    });

    // Save dummy videos to the database
    await video1.save();
    await video2.save();

    console.log('Dummy data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
}
