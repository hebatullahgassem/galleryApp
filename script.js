// 1. Create a gallary App that can save images from your computer with its name without extension (test.jpg -> test) 👍
// 2. Create a button to add new image to the gallary with its name under the image 👍
// 3. Create a button to delete an image from the gallary 👍
// 4. Create a button to delete all images from the gallary with a modal to confirm the action using in the middle of the screen (CSS) not the default confirm function 👍
// 5. Create a button to edit an image from the gallary
// 6. When you click on an image it opens a slider modal with the image and its name 👍
// 7. Create a button to close the slider or close the slider when pressing outside the slider or pressing the escape button 👍
// 8. Create a button to change the slider image to the next image using (CSS animation)
// 9. Create a button to change the slider image to the previous image (CSS animation)
// 10. Create dots under the slider to show the number of images and when you click on a dot it changes the slider image to the image with the same index of the dot


const imgs = ['./assets/german.jpg', './assets/golden.jpg', './assets/husky.jpg', './assets/doperman.jpg', './assets/rott.jpg', './assets/scottish.jpg', './assets/pitbull.jpg','./assets/beagle.jpg'];
const container = document.querySelector('.container');
const inputField = document.querySelector('input');
const addImageBtn = document.querySelector('.addImage');
const deleteAllBtn = document.querySelector('.deleteAllBtn');
const slider = document.querySelector('.slider');
const modalBack = document.querySelector('.modalBack');
const x = document.querySelector('.close');
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

let imgContainer;
let removeBtn;
let img;
let currentImgIndex = 0;

//modal function
deleteAllBtn.addEventListener('click', function(){
  const modal = document.getElementById('modal');
  const cancelDeleteBtn = document.getElementById('cancel-delete');
  const confirmDeleteBtn = document.getElementById('confirm-delete');

  //background style
  modalBack.style.display = 'block';

  //to display modal
  modal.style.display = 'block';

  //to cancel deleting images
  cancelDeleteBtn.addEventListener('click', function(){
    modal.style.display = 'none';
    modalBack.style.display = 'none';
  });

  //to confirm deleting images
  confirmDeleteBtn.addEventListener('click', function(){
    container.remove();
    modal.style.display = 'none';
    modalBack.style.display = 'none';
  });
});

//loop to display all images
for(let i = 0; i< imgs.length; i++){

    imageDisplay();
  
    //image and name elements 
    img = document.createElement('img');
    const fileName = document.createElement('p');
    const imageName = imgs[i].split('/').pop().split('.').shift();
  
    //display image with name
    img.src = imgs[i];
    fileName.textContent = imageName;
    imgContainer.appendChild(img);
    imgContainer.appendChild(fileName);
    imgContainer.appendChild(removeBtn);
  
    //add classes for styling
    img.className = 'images';
    fileName.className = 'names';

    //slider modal 
    img.addEventListener('click', sliderDisplaying);
    function sliderDisplaying(){
      //show slider
      slider.style.display = 'block';
    
      //background style
      modalBack.style.display = 'block';
    
      //display image
      const sliderImage = document.createElement('img');
      sliderImage.src = this.src;
      sliderImage.className = 'slider-images';
      slider.appendChild(sliderImage);
    
      //display name
      const fileName = document.createElement('p');
      const imageName = imgs[i].split('/').pop().split('.').shift();
      fileName.textContent = imageName;
      fileName.classList = 'sliderImageName';
      slider.appendChild(fileName);
    
      //previous image
      prevBtn.addEventListener('click', function(){
        if(i>0){
          i--;
          sliderImage.src = imgs[i].src;
        }
      });
    
      //next image
      nextBtn.addEventListener('click', function(){
        if(i< imgs.length -1){
          i++;
          sliderImage.src = imgs[i].src;
        }
      });
    
      //close slider options
      //close slider on click x button
      x.addEventListener('click', function(){
        slider.style.display = 'none';
        modalBack.style.display = 'none';
        modalBack.style.display = 'none';
      });
    
      //close slider on click esc button
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
          slider.style.display = 'none';
          modalBack.style.display = 'none';
        }
      });
    
      
      //close slider on click screen
      window.addEventListener('click', function(e){
        if(e.target == modalBack){
          slider.style.display = 'none';
          modalBack.style.display = 'none';
        }
      });
    }
}


//delete one image function
function deleteImage(event){
  event.target.parentElement.remove();
}

//add new image
addImageBtn.addEventListener('click', addImage);
function addImage(){
  //get url from user
  const imageUrl = inputField.value;

  //create image element for the new image
  const newImage = document.createElement('img');
  newImage.src = imageUrl
  newImage.className = 'images';

  //display image with name
  newImage.onload = function(){
    imageDisplay();

    //new image element
    const newImageName = document.createElement('p');

    //new image src string
    const newImageSrc = newImage.src;

    //image name 
    const imageName = newImageSrc.split('/').pop().split('.').shift();

    //assign class and name to the image name
    newImageName.className = 'names';
    newImageName.textContent = imageName;

    //display new image with name
    imgContainer.appendChild(newImage);
    imgContainer.appendChild(newImageName);
    imgContainer.appendChild(removeBtn);

    inputField.value = '';
  }

  //slider modal mew image
  newImage.addEventListener('click', sliderDisplaying);
}

//function to collect code used more than once
function imageDisplay(){
  imgContainer = document.createElement('div');
  imgContainer.className = 'imgContainer';
  container.appendChild(imgContainer);

  //remove button
  removeBtn = document.createElement('button');
  removeBtn.textContent = 'Delete Image';
  removeBtn.className = 'removeBtn';

  //delete image function
  removeBtn.addEventListener('click', deleteImage);
}