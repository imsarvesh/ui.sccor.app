export interface Comment {
  id: string | number;
  user: {
    name: string;
    image: string;
  };
  text: string;
  timestamp: string;
  likes: number;
}
