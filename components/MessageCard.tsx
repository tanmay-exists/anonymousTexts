import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {Message} from '@/model/User.ts'
import type { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";

type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({message, onMessageDelete}: MessageCardProps) => {
  
  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
    toast.success(response.data.message)
    onMessageDelete(message._id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{message.content}</CardTitle>
        <CardDescription>{new Date(message.createdAt).toLocaleString()}</CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive"><X className='w-5 h-5' /></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure to delete the message?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this message and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
    </Card>
  )
}

export default MessageCard
