import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Apod from "./apod";

function NasaPage() {
  return (
    <Tabs defaultValue="apod" className="min-h-[80dvh] te ">
      <TabsList className="">
        <TabsTrigger value="apod">APOD</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="apod">
        <Apod />
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}

export default NasaPage;
