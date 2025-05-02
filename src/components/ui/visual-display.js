import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export function VisualDisplay({ visualData }) {
  if (!visualData) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p className="text-center text-muted-foreground">
            No visual data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Visual Information</CardTitle>
        </CardHeader>
        <CardContent>
          {visualData.type === 'image' && (
            <motion.img
              src={visualData.url}
              alt="Visual data"
              className="w-full rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          {visualData.type === 'chart' && (
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <p>Chart visualization would render here</p>
            </div>
          )}
          {visualData.type === 'text' && (
            <div className="p-4 bg-muted rounded-lg">
              <p>{visualData.content}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}