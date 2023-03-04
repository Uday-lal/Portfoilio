import FirebaseAccess from "./firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function storageUpload(
  selectedFile: any,
  onDone: (fileStorageInfo: string) => void,
  onPrgress: (progressCount: number) => void,
  onError: () => void
) {
  const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
  if (selectedFile) {
    if (allowedTypes.includes(selectedFile.type)) {
      const metaData = {
        contentType: selectedFile.type,
      };
      const firebase = new FirebaseAccess();
      const storage = firebase.getStorage();
      const storageRef = ref(storage, selectedFile.name);
      const uploadTask = uploadBytesResumable(
        storageRef,
        selectedFile,
        metaData
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onPrgress(progress);
        },
        (error) => {
          onError()
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onDone(downloadURL)
          });
        }
      );
    }
  } else {
    onError()
  }
}

export default storageUpload;
