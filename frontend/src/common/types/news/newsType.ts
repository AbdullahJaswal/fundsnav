type NewsType = {
  title: string;
  description: string;
  points: {
    text: string;
    type: string;
    priority: number;
    own_point: boolean;
  }[];
};

export default NewsType;
