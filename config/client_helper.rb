require 'nokogiri'

class ClientHelper
	def ClientHelper.js_links content, relative_to_path
		Nokogiri::HTML.parse(content).css("script[src]").map { |sc| relative_to_path + sc['src'] }
	end

	def ClientHelper.css_links content, relative_to_path
		Nokogiri::HTML.parse(content).css("link[rel='stylesheet']").map do |css_tag| 
			relative_to_path + css_tag['href'] if css_tag['no-include'].nil?
		end
	end
end