gene_cat <- c("GO:1902222", "hsa00380", "hsa00630", "GO:0006559", "GO:0042773", "hsa00350", "hsa00730", "GO:0051792", "GO:0006572", "GO:0006573", "GO:0032324", "GO:0006390", "GO:0009250", "hsa01212", "GO:0005978")

gene_ontology <- gene_cat[grepl("^GO:", gene_cat)]
kegg <- gene_cat[grepl("^hsa", gene_cat)]

numbers_go <- sub(".*0(\\d+)", "\\1", gene_ontology)
numbers_kegg <- sub(".*0(\\d+)", "\\1", kegg)

print(numbers_go)
print(numbers_kegg)

?iris
library(ggplot2)
ggplot(data = iris, aes(x = Sepal.Length, y = Sepal.Width)) +
  geom_point(size= 4 , alpha=0.6)

library(readr)
witcher_df <- read_csv("https://raw.githubusercontent.com/kirushka/datasets/main/witcher.csv")
head(witcher_df)

## Задание 6
geralt_lines <- subset(witcher_df, Character == "Geralt")
geralt_lines$Character = NULL
hbdb <- geralt_lines$Text
hm_lines <- hbdb[grepl("^Hm", hbdb)]
percent_hm <- length(hm_lines) / length(hbdb) * 100
print(percent_hm)

## Задание 7
Roach_lines <- hbdb[grepl("Roach", hbdb)]
print(length(Roach_lines))



## Задание 9
library(tidyverse)

sakura_df <- read_csv("https://raw.githubusercontent.com/tacookson/data/master/sakura-flowering/sakura-modern.csv")
glimpse(sakura_df)
sakura_df <- sakura_df %>%
  mutate(days_to_full_bloom = full_bloom_doy - flower_doy)

ggplot(sakura_df, aes(x = days_to_full_bloom)) +
  geom_histogram(binwidth = 1) +
  labs(x = "Дни",
       y = "Частота")

random_cities <- sample(unique(sakura_df$station_name), 5)
ggplot(filter(sakura_df, station_name %in% random_cities), aes(x = days_to_full_bloom, fill = station_name)) +
  geom_histogram(alpha = 0.5, position = "identity") +
  facet_wrap(~station_name) +
  labs(x = "Дни",
       y = "Частота")

ggplot(filter(sakura_df, station_name %in% random_cities), aes(x = station_name, y = days_to_full_bloom, color = station_name)) +
  geom_boxplot() +
  geom_jitter(width = 0.15) +
  labs(x = "Город",
       y = "Дни") +
  theme_minimal()
