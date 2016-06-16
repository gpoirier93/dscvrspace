var body = models.Body.create({
  diameter:10
}).then(function(body) {
  console.log(body);
  body.createBodyDetail({
    volume:10
  })
});
