package com.example.restaurant;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class InsertItemController implements CommandLineRunner {
	@Autowired
	JdbcTemplate jdbcTemplate;

	List<Category> categoryList;

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		String sql = "SELECT * FROM category";
		categoryList = new ArrayList<Category>();

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

		for (Map row : rows) {
			Category category = new Category();

			category.setCategory_id(Integer.parseInt(row.get("category_id").toString()));
			category.setCategory_name(row.get("category_name").toString());
			categoryList.add(category);

		}

	}

//	@RequestMapping("/")
//	public String items(Model model) {
//
//		System.err.println("In controller class");
//		System.err.println(itemList);
//		model.addAttribute("item", itemList);
//		return "index";
//	}

	@RequestMapping("/insertItem")
	public String insertItem(@ModelAttribute("item") Item item, Model model) {

		String itemName = item.getItem();
		String itemDescription = item.getItem_description();
		int categoryID = item.getCategory_id();
		double price = item.getPrice();

		String sqlInsert = "INSERT INTO item (item,item_description,category_id,price) VALUES ('" + itemName + "' , '"
				+ itemDescription + "'," + categoryID + "," + price + ");";

		if (item.getItem() != null) {
			jdbcTemplate.update(new PreparedStatementCreator() {

				@Override
				public PreparedStatement createPreparedStatement(java.sql.Connection con) throws SQLException {
					PreparedStatement statement = con.prepareStatement(sqlInsert);
					// statement.setLong(1, beginning); set parameters you need in your insert
					System.out.println("Inserted");
					return statement;
				}
			});
		}

		model.addAttribute("category", categoryList);
		return "insertItem";
	}
}
