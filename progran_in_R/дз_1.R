#1
random_vec <- runif(n= 10 , min= 1 , max= 20 )
d <- random_vec[c(1, 5, 8)]**2
d
#2
a1=3
a2=4
a3=5
qwestion = (a1 + a2)>a3
qwestion
#3
mnogo = c(1:2000,4000:5000)
mnogo
#4
w <- c(1:20)
mean_1 <- mean(w)
mean_sd_down = mean_1 -sd(w)
mean_sd_up = mean_1 +sd(w)
qq <- w[w>mean_sd_down & w<mean_sd_up]
qq
