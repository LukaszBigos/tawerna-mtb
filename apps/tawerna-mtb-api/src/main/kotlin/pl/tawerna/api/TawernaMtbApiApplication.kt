package pl.tawerna.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TawernaMtbApiApplication

fun main(args: Array<String>) {
	runApplication<TawernaMtbApiApplication>(*args)
}
