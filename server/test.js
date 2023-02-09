function a(url,data={},config={}){
    console.log(data);
    console.log("config:"+ typeof config);
}
a("http:",{
    uid:1,gid:0
})