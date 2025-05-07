const params = new URLSearchParams(window.location.search);

loginType = params.get("type");
if(loginType === null){
    loginType = "register";
}


document.getElementById("loginArticle").style.display = loginType === "login" ? "block" : "none";
document.getElementById("registerArticle").style.display = loginType === "register" ? "block" : "none";


//TODO: MOVE THIS TO PROFILE PAGE
async function handleAvatarUpload() {
    const fileInput = document.getElementById('avatar');
    const file = fileInput.files[0];
    if (file) {
        try {
            const avatarUrl = await uploadAvatar(file);
            console.log('Avatar uploaded:', avatarUrl);
            document.getElementById("submitButton").disabled = false; // Enable the submit button after successful upload
        } catch (error) {
            console.error('Error uploading avatar:', error.message);
        }
    } else {
        alert('Please select an image file to upload.');
    }
}


async function uploadAvatar(file) {
    const { data: { user }, error } = await supabase.auth.getUser();
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the image to Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    // Retrieve the public URL of the uploaded image
    const { publicURL, error: urlError } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    if (urlError) {
        throw urlError;
    }

    // Update the user's profile with the avatar URL
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicURL })
        .eq('id', user.id);

    if (updateError) {
        throw updateError;
    }

    return publicURL;
}
