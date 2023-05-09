import mongoose from 'mongoose';
import dev from '.';
// import { dbURL } from '.';


export const connectDatabase = async () => {
    try {
        await mongoose.connect(dev.db.url);
        console.log('database is connected');
        } catch (error: unknown) {
        console.log('database is not connected');
        console.log(error);
        
            } 
    };
export default connectDatabase;