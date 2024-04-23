import { useEffect, useState } from "react";
import { loggedUserData, updateProfile } from '@/API/UserAPI';
import { useRouter } from 'next/router';
import { UploadImg } from '@/API/UploadImgAPI';

export default function Profile() {
    const router = useRouter();
    const [loggedUser, setLoggedUser] = useState(null);
    const [imageFile, setImageFile] = useState(null); // State untuk menyimpan file gambar yang dipilih
    const [editedProfile, setEditedProfile] = useState({
        name: '',
        email: '',
        profilePictureUrl: '',
        phoneNumber: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const LoggedUser = await loggedUserData();
                setLoggedUser(LoggedUser);
                setEditedProfile(LoggedUser);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "imageUrl") {
            const file = e.target.files[0];
            setImageFile(file);
            setEditedProfile(prevProfile => ({
                ...prevProfile,
                profilePictureUrl: URL.createObjectURL(file)
            }));
        } else {
            setEditedProfile(prevProfile => ({
                ...prevProfile,
                [name]: value
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            if (imageFile) {
                const uploadResponse = await UploadImg(imageFile);
                if (uploadResponse && uploadResponse.data && uploadResponse.data.url) {
                    setEditedProfile(prevProfile => ({
                        ...prevProfile,
                        profilePictureUrl: uploadResponse.data.url
                    }));
                } else {
                    console.error('Error uploading image:', uploadResponse);
                }
            }
            
            const updatedUser = await updateProfile(editedProfile);
            setLoggedUser(updatedUser);
            setIsModalOpen(false);
            router.reload();
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div>
            {loggedUser && (
                <div>
                    <h1>{loggedUser.name}</h1>
                    <p>{loggedUser.email}</p>
                    <img src={loggedUser.profilePictureUrl} alt={loggedUser.name} />
                    <p>{loggedUser.role}</p>
                    <p>{loggedUser.phoneNumber}</p>
                    <button onClick={() => setIsModalOpen(true)}>Edit</button>
                    <button onClick={() => router.back()}>back</button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Name:</label>
                                <input type="text" name="name" value={editedProfile.name} onChange={handleChange} className="form-control" />
                                <label>Email:</label>
                                <input type="text" name="email" value={editedProfile.email} onChange={handleChange} className="form-control" />
                                <label>Profile Picture:</label>
                                <input type="file" id="imageUrl" name="imageUrl" onChange={handleChange} className="form-control" /><br />
                                {editedProfile.profilePictureUrl && <img src={editedProfile.profilePictureUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
                                <label>Phone Number:</label>
                                <input type="text" name="phoneNumber" value={editedProfile.phoneNumber} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
