import { useEffect, useState } from "react";
import { loggedUserData, updateProfile } from '@/API/UserAPI';
import { useRouter } from 'next/router';
import Link from "next/link";
import { UploadImg } from '@/API/UploadImgAPI';

export default function Profile() {
    const router = useRouter();
    const [loggedUser, setLoggedUser] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        name: '',
        email: '',
        profilePictureUrl: '',
        phoneNumber: ''
    });

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
    const { name, value, files } = e.target;
    if (name === "imageUrl") {
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setEditedProfile({ ...editedProfile, profilePictureUrl: reader.result });
            setImageFile(file);
        };
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
                throw new Error('Error uploading image');
            }
        }
        
        const updatedUser = await updateProfile(editedProfile);
        setLoggedUser(updatedUser);
        setIsModalOpen(false);
        router.reload();
    } catch (error) {
        console.error('Error updating user data:', error.message);
    }
};

    return (
        <div>
            {loggedUser && (
                <div className='container'>
                    <div className="back-buttonid">
                    <div className="d-flex gap-3">
                        <Link href="/dashboard"><i className="bi bi-chevron-left"></i></Link>
                        <div>
                            <Link href="/dashboard">{loggedUser.name}</Link>
                        </div>
                    </div>
                    <div className="ratingActivity">
                        <button type="button" className="btn btn-edit" onClick={() => setIsModalOpen(true)}>
                            Edit banner
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className='img-profile col-md-8'>
                    <img src={loggedUser.profilePictureUrl} alt={loggedUser.name} />
                    </div>
                    <div className='body-profile col-md-4'>
                    <h3>email</h3>
                    <h5>{loggedUser.email}</h5>
                    <h3>role</h3>
                    <h5>{loggedUser.role}</h5>
                    <h3>phoneNumber</h3>
                    <h5>{loggedUser.phoneNumber}</h5>
                    </div>
                </div>
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
                                <label>Phone Number:</label>
                                <input type="text" name="phoneNumber" value={editedProfile.phoneNumber} onChange={handleChange} className="form-control" />
                                <label>Profile Picture:</label>
                                <input type="file" id="imageUrl" name="imageUrl" onChange={handleChange} className="form-control" /><br />
                                {editedProfile.profilePictureUrl && <img src={editedProfile.profilePictureUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
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
