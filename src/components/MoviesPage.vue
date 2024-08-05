<template>
    <div class="container-xl  bg-color text-white">

        <!-- row-cols-3 row-cols-sm-5 row-cols-md-6 row-cols-xxl-5 -->
        <div class=" p-3 row row-cols-3 row-cols-sm-5 row-cols-md-6   justify-center">
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img2.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img1.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img2.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img2.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img1.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img2.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img2.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img1.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img2.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img2.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img1.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            <div class="mb-4">
                <div class=" bcolor">
                    <img class="img-res rounded-3 " src="@/assets/img2.jpg" alt="/">
                </div>
                <div id="des" class="d-flex flex-column">
                    <p class="truncate ">LSD Lover Champian</p>
                    <p class="gern">Action</p>
                    <P class="quality" >PDVDRip</P>
                </div>
            </div>
            
            
            
        </div>

    </div>

</template>

<!-- script section -->
<script>

export default {
    name: "MoviesPage"

}
</script>

<!-- style section -->
<style scoped>

.truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
.img-res{
    height: 180px;
    width: 100%;
    object-fit: cover ; 
}
.bcolor{
    border: 1px solid red;
    padding: 2px;
    border-radius: 10px;
}
#des p{
    margin-bottom: 1px;
}
.gern{
    font-size: 10px;
}
.quality{
    font-size: 11px;
    color: yellow;
}
.bg-color{
    background-color: #161212;
}
@media (min-width :1100px) {
    .img-res{
    height: 220px;
    width: 100%;
    object-fit: cover ; 
}
}
</style>