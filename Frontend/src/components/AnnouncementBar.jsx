import { Alert, AlertDescription } from "@/components/ui/alert"
import { Megaphone } from "lucide-react"

const AnnouncementBar = ({ text }) => {
  return (
    <Alert className="rounded-none bg-primary text-white border-none px-6 py-3 flex justify-center items-center">
      <div className="flex items-center gap-2">
        <Megaphone className="h-4 w-4" />
        <AlertDescription>
          🎉 {text}
        </AlertDescription>
      </div>
    </Alert>
  )
}

export default AnnouncementBar;