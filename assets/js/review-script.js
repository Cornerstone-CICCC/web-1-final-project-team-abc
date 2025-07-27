// Review data
const reviews = [
    {
        id: 1,
        review: "Carla is the best! She made me the night's brightest star! She stayed with me the whole  wedding ensuring I always looked and felt wonderful!!",
        reviewerSig_path:"/assets/images/Janny.png"
    },
    {
        id: 2,
        review: "Carla Beauty's party makeup service was amazing! The makeup lasted all night, keeping me flawless until the end. Thank you, Carla for an unforgettable experience!",
        reviewerSig_path:"/assets/images/Marcela.png"
    },
    {
        id: 3,
        review: "Carla Beauty's makeup for my photoshoot was outstanding! Their expertise and attention to detail made me look perfect in every shot. Highly recommend!",
        reviewerSig_path:"/assets/images/Ingrid.png"
    },
]

//select items to change
const reviewText = document.getElementById("review-desc")
const reviewerSigImg = document.getElementById("reviewer_sig")

const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

let currentItem = 0

// load initial item
window.addEventListener("DOMContentLoaded", function () {
  const item = reviews[currentItem];
 
  reviewText.textContent = item.review;
  reviewerSigImg.src = item.reviewerSig_path;

});


nextBtn.addEventListener("click", function(){
    currentItem++
    if (currentItem > reviews.length -1){
        currentItem = 0
    }
    showReview(currentItem)
})

prevBtn.addEventListener("click", function(){
    currentItem--
    if(currentItem < 0){
        currentItem = reviews.length-1
    }
    showReview(currentItem)
})

//save review data
function showReview(reviewId){
    const item = reviews[reviewId]

    reviewText.textContent = item.review;
    reviewerSigImg.src = item.reviewerSig_path;

}

function autoReviewSlide(){

    showReview(currentItem)
    currentItem = (currentItem +1)%reviews.length
}
autoReviewSlide()

setInterval(autoReviewSlide,3000)