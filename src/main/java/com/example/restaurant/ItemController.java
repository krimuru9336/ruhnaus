package com.example.restaurant;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ItemController implements CommandLineRunner {
	@Autowired
	JdbcTemplate jdbcTemplate;

	List<Item> itemList;

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		String sql = "SELECT * FROM item";
		itemList = new ArrayList<Item>();

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

		for (Map row : rows) {
			Item item = new Item();

			item.setItem_id(Integer.parseInt(row.get("item_id").toString()));
			item.setItem(row.get("item").toString());
			item.setItem_description(row.get("item_description").toString());
			item.setCategory_id(Integer.parseInt(row.get("category_id").toString()));
			item.setPrice(Double.parseDouble(row.get("price").toString()));

			itemList.add(item);

			System.err.println(item.getItem());
		}

	}

	@RequestMapping("/")
	public String items(Model model) {

		System.err.println("In controller class");
		System.err.println(itemList);
		model.addAttribute("item", itemList);
		return "index";
	}

}
